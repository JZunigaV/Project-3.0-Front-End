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
  Label,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  UncontrolledCarousel,
} from "reactstrap";

const carouselItems = [
  {
    src: require("../../assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States",
  },
  {
    src: require("../../assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States",
  },
  {
    src: require("../../assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States",
  },
];

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
  };

  service = new ProfileService();
  authService = new AuthService();

  componentWillMount = () => {
    debugger;
    this.authService
      .loggedin()
      .then(user => {
        this.setState({ avatarUrl: user.avatarUrl });
      })
      .catch(error => {
        console.log(error);
      });
  };

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

  componentWillUnmount = () => {
    document.body.classList.toggle("profile-page");
  };

  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index,
    });
  };

  //Handle Edit
  handleEdit = event => {
    event.preventDefault();
    this.setState({ isEditing: true });
  };

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

  onChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  render() {
    const avatar = this.state.avatarUrl;
    const userName = this.props.loggedInUser.username;

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

                    <h5 className="text-on-back">01</h5>
                    <p className="profile-description">
                      {this.state.profile ? this.state.profile.bio : ""}
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
          <div className="section">
            <Container>
              <Row className="justify-content-between">
                <Col md="6">
                  <Row className="justify-content-between align-items-center">
                    <UncontrolledCarousel items={carouselItems} />
                  </Row>
                </Col>
                <Col md="5">
                  <h1 className="profile-title text-left">Favorite movies</h1>
                  <h5 className="text-on-back">02</h5>
                  <p className="profile-description text-left">
                    An artist of considerable range, Ryan — the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
                  </p>

                  <div className="btn-wrapper pt-3">
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
        </div>
      </>
    );
  }
}
export default ProfilePage;
