import React from "react";

//Services
import ProfileService from "./ProfileService";
import AuthService from "../auth/AuthService";

//components
import InfoModal from "../Profile/InfoModal";
import Loading from "../Loading";

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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

//SweetAlert
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

class ProfilePage extends React.Component {
  state = {
    tabs: 1,
    profile: {},
    isLoading: false,
    isEditing: false,
    bio: "",
    twitterUsername: "",
    file: null,
    favoriteMovies: [],
    carouselItems: [],
    show: false,
    showError: false,
    showErrorImage: false,
    selectedMovieId: "",
    modal: false,
    movieDetail: {},
    movieInfo: {},
  };

  service = new ProfileService();
  authService = new AuthService();

  //Method that triggers when the component loads,  where we get the avatar url and favorite movies
  componentWillMount = () => {
    this.setState({ isLoading: true });
    this.service
      .getFavorites(this.props.loggedInUser._id)
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
  };

  //Fill the carousel object
  fillCarousel = favorites => {
    this.setState({ carouselItems: [] });
    favorites.map((ele, index) => {
      let newItem = {
        src: ele.background,
        altText: ele.title,
        caption: "",
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
    const userId = this.props.loggedInUser._id;

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

  //Clear style when component unmounts
  componentWillUnmount = () => {
    document.body.classList.toggle("profile-page");
  };

  //Handle Edit Profile Button
  handleEdit = event => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };

  //Handle edit profile form submit
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const userId = this.props.loggedInUser._id;
    const bio = this.state.bio;
    const twitterUsername = this.state.twitterUsername;

    this.service
      .createUpdateUser(userId, bio, twitterUsername)
      .then(response => {
        //Here we send the  twitter profile to the single source of truth

        if (response === "El usuario de twitter no existe") {
          this.setState({ isLoading: false, showError: true });

          return;
        }

        if (response.profile.social) {
          this.props.liftProfile(response.profile.social.twitter);
        }
        debugger;
        this.setState({ profile: response.profile });
        if (this.state.file) {
          this.service
            .addPicture(this.state.file, userId)
            .then(pictureData => {
              this.props.liftAvatar(pictureData.pictureUrl);
              this.setState({
                bio: "",
                twitterUsername: "",
                isEditing: false,
                isLoading: false,
              });
            })
            .catch(err => {
              this.setState({ isLoading: false, showErrorImage: true });
            });
        } else {
          this.setState({
            bio: "",
            twitterUsername: "",
            isEditing: false,
            isLoading: false,
          });
        }
      })
      .catch(err => {
        this.service.errHandler(err);
        this.setState({ isLoading: false });
        alert(err);
      });
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

  //Modal handlers
  toggleModal = (modalState, details) => {
    if (details) {
      let releaseDate = parseInt(details.release.substring(0, 4));

      this.setState({ isLoading: true });

      this.service
        .getMovieInfo(details.title, releaseDate)
        .then(info => {
          let movieInfo = { ...info };
          this.setState({ movieInfo: movieInfo, isLoading: false });
        })
        .catch(err => {
          console.log(err);
        });
    }

    this.setState({
      [modalState]: !this.state[modalState],
      movieDetail: details,
    });
  };

  //Render Method
  render() {
    const avatar = this.props.loggedInUser.avatarUrl;
    const userName = this.props.loggedInUser.username.toUpperCase();
    const twiterUsername = this.props.loggedInUser.twitterUsername;

    //Style in card tasks.sass
    if ((this.state.favoriteMovies || []).length > 0 && !this.state.isLoading) {
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
              <CardTitle tag="h4">{movie.title}</CardTitle>

              <Button
                color="success"
                onClick={() => this.toggleModal("modal", details)}
              >
                Donde ver
              </Button>

              <Button
                color="warning"
                onClick={() =>
                  this.setState({ show: true, selectedMovieId: movie._id })
                }
              >
                Eliminar favorito
              </Button>

              <SweetAlert
                show={this.state.show}
                title="¿Seguro que quieres eliminar esta película de favoritos?"
                type="info"
                confirmButtonColor="#a3190d"
                cancelButtonText="Cancelar"
                showCancelButton
                onConfirm={() => {
                  this.setState({ show: false });
                  this.deleteFavorite(
                    this.state.selectedMovieId,
                    this.props.loggedInUser._id,
                  );
                }}
                onCancel={() => {
                  this.setState({ show: false });
                }}
                onClose={() => console.log("close")} // eslint-disable-line no-console
              />
            </CardBody>
          </Card>
        );
      });
    }

    return (
      <>
        {!this.state.isLoading ? (
          <>
            <div className="wrapper">
              <div className="page-header">
                <Container className="align-items-center">
                  <Row>
                    <Col lg="6" md="6">
                      <div className="profile-description">
                        <h2>
                          {this.state.carouselItems.length} Películas agregadas{" "}
                        </h2>

                        {this.state.carouselItems.length > 0 && (
                          <UncontrolledCarousel
                            items={this.state.carouselItems}
                            key={this.state.carouselItems.pictureId}
                          />
                        )}
                      </div>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6">
                      <Card className="card-coin card-plain">
                        <CardHeader>
                          {avatar ? (
                            <img
                              alt="avatar"
                              className="img-center img-fluid rounded-circle"
                              src={avatar}
                            />
                          ) : (
                            <img
                              alt="avatar"
                              className="img-center img-fluid rounded-circle"
                              src={require("../../assets/img/user-placeholder.png")}
                            />
                          )}

                          <h4 className="title">{userName}</h4>
                          {twiterUsername && twiterUsername !== "" && (
                            <h5>@{twiterUsername}</h5>
                          )}

                          <br />
                          <p className="profile-description">
                            {/* {this.props.loggedInUser.bio} */}
                            {this.state.profile && this.state.profile.bio}
                          </p>

                          {/* Edit Profile Button */}
                          <Button
                            className="btn-simple"
                            color="primary"
                            onClick={this.handleEdit}
                          >
                            <i className="tim-icons icon-book-bookmark" />
                            Editar perfil
                          </Button>
                        </CardHeader>

                        <CardBody>
                          {this.state.isEditing && (
                            <Form onSubmit={this.handleSubmit}>
                              {/* Bio */}
                              <Row>
                                <Label sm="3">Bio:</Label>
                                <Col sm="9">
                                  <FormGroup>
                                    <Input
                                      placeholder="Un poco sobre tí"
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
                                <Label sm="3">Usuario de Twitter</Label>
                                <Col sm="9">
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <i className="fa fa-at" />
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input
                                        placeholder="Usuario de twitter"
                                        type="text"
                                        name="twitterUsername"
                                        onChange={this.onChange}
                                        value={this.state.twitterUsername}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>

                              {/* Avatar */}
                              <Row>
                                <Label sm="3">Avatar:</Label>
                                <Col sm="9">
                                  <Input
                                    type="file"
                                    name="file"
                                    id="exampleFile"
                                    onChange={e => this.handleChange(e)}
                                    className="holaaa"
                                  />
                                  <br />
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
                </Container>
              </div>

              {/* Favorite movies */}
              <div className="wrapper" style={{ marginTop: "100px" }}>
                <h1 className="text-center">Películas favoritas</h1>
                <div className="content-center">
                  <Col lg="12" md="4" className="col-sm" />
                  <div className="movie-cards">{movies}</div>
                </div>
              </div>
              {this.state.carouselItems.length > 0 ? (
                <div className="section" />
              ) : (
                <h1>Aún no has agregado favoritos</h1>
              )}
            </div>

            {/* Info Modal */}

            {this.state.movieDetail &&
              this.state.movieInfo &&
              !this.state.isLoading && (
                <InfoModal
                  isOpen={this.state.modal}
                  toggle={() => this.toggleModal("modal")}
                  title={this.state.movieDetail.title}
                  background={`http://image.tmdb.org/t/p/w500/${
                    this.state.movieDetail.backdrop
                  }`}
                  posterPath={this.state.movieDetail.posterPath}
                  backdrop={this.state.movieDetail.backdrop}
                  info={this.state.movieInfo}
                />
              )}

            {/* Error alert */}
            <SweetAlert
              show={this.state.showError}
              title="El usuario de twitter no existe"
              text="Por favor verifícalo e intenta otra vez"
              type="error"
              onConfirm={() => this.setState({ showError: false })}
            />

            <SweetAlert
              show={this.state.showErrorImage}
              title="El formato de la imagen no es correcto"
              text="Formatos permitidos: JPG,PNG,GIF"
              type="error"
              onConfirm={() => this.setState({ showErrorImage: false })}
            />
          </>
        ) : (
          <Loading loadingmsg={"Obteniendo datos del perfil"} />
        )}
      </>
    );
  }
}
export default ProfilePage;
