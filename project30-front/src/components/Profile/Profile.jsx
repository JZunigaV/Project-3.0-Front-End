import React from "react";

//Services
import ProfileService from "./ProfileService";
import AuthService from "../auth/AuthService";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  UncontrolledCarousel,
} from "reactstrap";

class ProfilePage extends React.Component {
  state = {
    tabs: 1,
    profile: {},
    isLoading: false,
    isEditing: false,
    avatarUrl: "",
    location: "",
    bio: "",
    file: null,
    favoriteMovies: [],
    carouselItems: [],
  };

  // carouselItems = [];
  service = new ProfileService();
  authService = new AuthService();

  //Method that triggers when the component loads,  where we get the avatar url and favorite movies
  componentWillMount = () => {
    this.setState({ isLoading: true });
    this.authService
      .loggedin()
      .then(user => {
        this.setState({ avatarUrl: user.avatarUrl });
        this.service
          .getFavorites(user._id)
          .then(favoriteRes => {
            this.setState({ favoriteMovies: favoriteRes.favoriteMovies });
            //Fill the carousel items object
            this.fillCarousel(this.state.favoriteMovies);
            this.setState({ isLoading: false });
          })
          .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
          });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  //Fill the carousel object
  fillCarousel = favorites => {
    this.setState({ carouselItems: [] });
    favorites.map((ele, index) => {
      let newItem = {
        src: ele.background,
        altText: ele.title,
        caption: ele.overview,
        pictureId: ele._id,
      };
      if (this.state.carouselItems.indexOf(newItem.pictureId) === -1) {
        this.state.carouselItems.push(newItem);
      }
      return this.state.carouselItems;
    });
  };

  //Here we make requests to get profile info
  componentDidMount = () => {
    //Profile styles
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
    }
    document.body.classList.toggle("profile-page");

    //Backend request to profile info
    this.setState({ isLoading: true });
    const { id: userId } = this.props.match.params;

    this.service
      .getUser(userId)
      .then(response => {
        this.setState({ isLoading: false });
        this.setState({ profile: response.profile });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  //Clear style when componen unmounts
  componentWillUnmount = () => {
    document.body.classList.toggle("profile-page");
  };

  //Handle Edit Profile Button
  handleEdit = event => {
    event.preventDefault();
    this.setState({ isEditing: true });
  };

  //Handle edit profile form submit
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const userId = this.props.match.params;
    const location = this.state.location;
    const bio = this.state.bio;
    this.service
      .createUpdateUser(userId, location, bio)
      .then(response => {
        this.service
          .addPicture(this.state.file, userId)
          .then(pictureData => {
            this.setState({
              profile: response.profile,
              location: "",
              bio: "",
              twitterUsername: "",
              avatarUrl: pictureData.pictureUrl,
              isEditing: false,
              isLoading: false,
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => alert(err));
  };

  //Inputs on  change Method
  onChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  //Picture change Method
  handleChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  //Delete favorite movie method
  deleteFavorite = (movie, userId) => {
    this.setState({ isLoading: true });
    this.service
      .deleteFavorite(movie, userId)
      .then(deleteReponse => {
        //If the process was succesful then we need to set the state with new array of movies
        this.service
          .getFavorites(deleteReponse.value.user)
          .then(favorites => {
            this.setState({
              favoriteMovies: favorites.favoriteMovies,
            });
            this.fillCarousel(this.state.favoriteMovies);
            this.setState({ isLoading: false });
          })
          .catch(err => {
            this.setState({ isLoading: false });
            alert(err);
          });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  //Render Method
  render() {
    const avatar = this.state.avatarUrl;
    const userName = this.props.loggedInUser.username.toUpperCase();

    //Style in card tasks.sass

    if ((this.state.favoriteMovies || []).length > 0) {
      var movies = this.state.favoriteMovies.map(movie => {
        const details = {
          overview: movie.overview,
          title: movie.title,
          backdrop: movie.background,
          release: movie.release,
          posterPath: movie.posterPath,
        };

        return (
          <Card className="card-movies" key={movie._id}>
            <CardHeader>
              <img
                className="img-fluid rounded shadow-lg"
                src={`http://image.tmdb.org/t/p/w185/${movie.posterPath}`}
                alt={movie.title}
              />
            </CardHeader>

            <CardBody>
              <CardTitle tag="h3">{movie.title}</CardTitle>

              <Button
                color="success"
                onClick={() => this.toggleModal("modal", details)}
              >
                View movie details
              </Button>

              <Button
                color="warning"
                onClick={() =>
                  this.deleteFavorite(movie, this.props.match.params)
                }
              >
                Delete movie
              </Button>
            </CardBody>
          </Card>
        );
      });
    }

    return (
      <>
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("../../assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("../../assets/img/path4.png")}
            />

            <Container className="align-items-center">
              {!this.state.isLoading && (
                <Row>
                  <Col lg="6" md="6">
                    <h1 className="profile-title text-left">{userName}</h1>
                    <p className="profile-description">
                      {this.state.profile && this.state.profile.bio}
                    </p>
                  </Col>
                  <Col className="ml-auto mr-auto" lg="4" md="6">
                    <Card className="card-coin card-plain">
                      <CardHeader>
                        <img
                          alt="avatar"
                          className="img-center img-fluid rounded-circle"
                          src={avatar}
                        />

                        <h4 className="title">
                          Country{" "}
                          {this.state.profile
                            ? this.state.profile.location
                            : ""}
                        </h4>
                        {/* Edit Profile Button */}
                        <Button
                          className="btn-simple"
                          color="primary"
                          onClick={this.handleEdit}
                        >
                          <i className="tim-icons icon-book-bookmark" /> Edit
                          Profile
                        </Button>
                      </CardHeader>

                      <CardBody>
                        {this.state.isEditing && (
                          <Form onSubmit={this.handleSubmit}>
                            {/* Location */}
                            <Row>
                              <Label sm="3">Location</Label>
                              <Col sm="9">
                                <FormGroup>
                                  <Input
                                    placeholder="from where are you visiting us"
                                    type="text"
                                    name="location"
                                    onChange={this.onChange}
                                    value={this.state.location}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            {/* Bio */}
                            <Row>
                              <Label sm="3">Bio</Label>
                              <Col sm="9">
                                <FormGroup>
                                  <Input
                                    placeholder="tell us something about you"
                                    type="text"
                                    name="bio"
                                    onChange={this.onChange}
                                    value={this.state.bio}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            {/* Twitter Url */}
                            <Row>
                              <Label sm="3">Twitter</Label>
                              <Col sm="9">
                                <FormGroup>
                                  <Input
                                    placeholder="twitter Username"
                                    type="text"
                                    name="bio"
                                    onChange={this.onChange}
                                    value={this.state.twitterUsername}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            {/* Avatar */}
                            <Row>
                              <Label sm="3">Avatar:</Label>
                              <Col sm="9">
                                <FormGroup>
                                  <Input
                                    type="file"
                                    name="file"
                                    id="exampleFile"
                                    onChange={e => this.handleChange(e)}
                                    className="holaaa"
                                  />

                                  <br />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Button
                              className="btn-simple btn-icon btn-round float-right"
                              color="primary"
                              type="submit"
                            >
                              <i className="tim-icons icon-send" />
                            </Button>
                          </Form>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              )}
            </Container>
          </div>

          {/* Favorite movies */}

          {!this.state.isLoading && (
            <>
              <div className="wrapper" style={{ marginTop: "100px" }}>
                <h1 className="text-center">Favorite movies</h1>
                <div className="content-center">
                  <Col lg="4" md="4" className="col-sm" />

                  <Row>{movies}</Row>
                </div>
              </div>

              {this.state.carouselItems.length > 0 ? (
                <div className="section">
                  <Container>
                    <Row className="justify-content-between">
                      <Col md="12">
                        <Row className="justify-content-between align-items-center">
                          <UncontrolledCarousel
                            items={this.state.carouselItems}
                            key={this.state.carouselItems.pictureId}
                          />
                        </Row>
                      </Col>
                      <Col md="5">
                        <h1 className="profile-title text-left">
                          Favorite movies
                        </h1>
                        <h5 className="text-on-back">
                          {this.state.carouselItems.length}
                        </h5>
                        <p className="profile-description text-left">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Laboriosam consectetur provident iusto commodi
                          est quis earum magnam aliquid cupiditate harum
                          quibusdam aliquam pariatur quo maiores, eos nemo
                          fugiat itaque? Ad.
                        </p>

                        <div className="btngit -wrapper pt-3">
                          <Button className="btn-simple" color="primary">
                            <i className="tim-icons icon-book-bookmark" /> Edit
                            Profile
                          </Button>

                          <Button
                            className="btn-simple"
                            color="info"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="tim-icons icon-bulb-63" /> Check it!
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              ) : (
                <h1>You dont't have favorite movies yet</h1>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}
export default ProfilePage;
