import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
//Service
import RecommendationService from "./RecommendationService";
import ProfileService from "../Profile/ProfileService";
import MovieModal from "./MovieModal";

//Loading Component
import Loading from "../Loading";

// reactstrap components
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";

//SweetAlert
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

class Recommendations extends React.Component {
  //Class part
  state = {
    twitterUsername: "",
    recommendations: [],
    modal: false,
    formShowing: false,
    userShowing: false,
    movieDetail: {},
    isLoading: false,
    showAlert: false,
    showError: false,
    showErrorIBM: false,
    errorIBMTitle: "",
    errorIBMText: "",
    showDuplicate: false,
    noTwitter: false,
    fromForm: false,
    isRepeated: false,
  };

  componentDidMount() {
    document.body.classList.toggle("landing-page");
    //Listen for the state of the twitter Username
    if (this.props.loggedInUser.twitterUsername) {
      this.setState({ userShowing: true });
      //If the user registered a twitter on his profile the search will launch atomatically
      this.searchMoviesForUser();
    } else {
      this.setState({ formShowing: true });
    }
  }

  searchMoviesForUser = () => {
    this.setState({ isLoading: true });
    if (this.props.loggedInUser.twitterUsername) {
      this.service
        .movieRecommendations(this.props.loggedInUser.twitterUsername)
        .then(response => {
          if (response.error) {
            switch (response.error.code) {
              case 400:
                this.setState({
                  showErrorIBM: true,
                  errorIBMTitle: "No se pudó realizar el análisis",
                  errorIBMText:
                    "El usuario no tiene mínimo 100 palabras las cuales son necesarias para realizar el análisis, intente de nuevo con otro usuario",
                  isLoading: false,
                });
                break;

              default:
                break;
            }
          } else {
            this.setState({
              recommendations: response,
              twitterUsername: this.props.loggedInUser.twitterUsername,
              isLoading: false,
              fromForm: false,
            });
            //Here we pass twitter username to App.js
            this.props.liftTwitter(this.state.twitterUsername);
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
    }
  };

  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  //Service instance
  service = new RecommendationService();
  profileService = new ProfileService();

  //Form handle methods
  onChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSearchForm = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const twitterUsername = this.state.twitterUsername;
    this.service
      .movieRecommendations(twitterUsername)
      .then(response => {
        if (response) {
          if (response.error) {
            switch (response.error.code) {
              case 400:
                this.setState({
                  showErrorIBM: true,
                  errorIBMTitle: "No se pudó realizar el análisis",
                  errorIBMText:
                    "El usuario no tiene mínimo 100 palabras las cuales son necesarias para realizar el análisis, intente de nuevo con otro usuario",
                  isLoading: false,
                });
                break;

              default:
                break;
            }
          }

          this.setState({
            recommendations: response,
            isLoading: false,
            fromForm: true,
          });
          //Here we pass twitter username to App.js
          this.props.liftTwitter(this.state.twitterUsername);
        } else {
          this.setState({ isLoading: false, showError: true });
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  //Modal handlers
  toggleModal = (modalState, details) => {
    this.setState({
      [modalState]: !this.state[modalState],
      movieDetail: details,
    });
  };

  favoriteHandler = movie => {
    //Here we have to send parameters to our backend route profile to add favorite
    this.profileService
      .getFavorites(this.props.loggedInUser._id)
      .then(favorites => {
        if (favorites.msg === "no hay favoritas aun") {
          this.profileService
            .addFavorite(this.props.loggedInUser._id, movie)
            .then(movie => {
              this.setState({ showAlert: true });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          if (
            favorites.favoriteMovies.some(
              e => e.posterPath === movie.posterPath,
            )
          ) {
            this.setState({ isRepeated: true });
          } else {
            this.setState({ isRepeated: false });
          }

          if (!this.state.isRepeated) {
            this.profileService
              .addFavorite(this.props.loggedInUser._id, movie)
              .then(movie => {
                this.setState({ showAlert: true });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.setState({ showDuplicate: true });
          }
        }
      })
      .catch(err => alert(err));
  };

  toggleForm = event => {
    event.preventDefault();
    this.setState({ userShowing: false });
  };

  toggleUser = event => {
    event.preventDefault();
    this.setState({ userShowing: true });
    this.searchMoviesForUser();
  };

  render() {
    //Javascript
    // this.checkUser(this.props.loggedInUser.twiterUsername);
    //Style in card tasks.sass
    if ((this.state.recommendations || []).length > 0) {
      var movies = this.state.recommendations.map(subArray => {
        return subArray.map((movie, index) => {
          const details = {
            overview: movie.overview,
            title: movie.title,
            backdrop: movie.backdrop_path,
            release: movie.release_date,
            posterPath: movie.poster_path,
          };

          return (
            <Card className="card-movies" key={movie.id}>
              <CardHeader>
                <img
                  className="img-fluid rounded shadow-lg"
                  src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                  alt={movie.title}
                />
              </CardHeader>

              <CardBody>
                <CardTitle tag="h4">{movie.title}</CardTitle>

                <Button
                  color="success"
                  onClick={() => this.toggleModal("modal", details)}
                >
                  Detalles
                </Button>
              </CardBody>
            </Card>
          );
        });
      });
    }

    return (
      <div>
        <div className="wrapper">
          {/* Header */}
          {!this.state.isLoading ? (
            <>
              <div className="page-header-recommendation">
                <div className="content-center">
                  {this.state.userShowing ? (
                    <div className="username-recommend">
                      <Row>
                        <Col lg="12" md="12">
                          <h1>
                            Recomendaciones para @
                            {this.props.loggedInUser.twitterUsername}
                          </h1>
                          <Button
                            type="submit"
                            className="btn-round"
                            color="success"
                            size="lg"
                            onClick={this.toggleForm}
                          >
                            Buscar para alguien más
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <>
                      <Row className="">
                        <Col lg="12" md="12">
                          <Form
                            className="form form-recommend"
                            onSubmit={this.handleSearchForm}
                            id="input-form"
                          >
                            <h1>Recomendaciones</h1>
                            {/* twitter username */}
                            <InputGroup
                              className={classnames({
                                "input-group-focus": this.state.fullNameFocus,
                              })}
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="fab fa-twitter" />
                                  <i className="fa fa-at" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="usuario de twitter"
                                type="text"
                                name="twitterUsername"
                                onChange={this.onChange}
                                value={this.state.username}
                                onFocus={e =>
                                  this.setState({ fullNameFocus: true })
                                }
                                onBlur={e =>
                                  this.setState({ fullNameFocus: false })
                                }
                                required={true}
                              />
                            </InputGroup>

                            <Button
                              type="submit"
                              className="btn-round"
                              color="success"
                              size="lg"
                            >
                              Buscar!!!
                            </Button>
                          </Form>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="12" md="12">
                          {this.props.loggedInUser.twitterUsername && (
                            <Button
                              type="submit"
                              className="btn-round movies-me"
                              color="success"
                              size="lg"
                              onClick={this.toggleUser}
                            >
                              Buscar con mi usuario
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
              </div>
              {/* {!this.state.isLoading ? ( */}
              <div className="content-center">
                <Col lg="4" md="4" sm="4" className="col-sm" />
                {this.state.recommendations.length > 0 && (
                  <>
                    {this.state.fromForm ? (
                      <h1>
                        Algunas películas que te podrian gustar @
                        {this.state.twitterUsername}
                      </h1>
                    ) : (
                      <h1>Algunas películas que te podrían gustar</h1>
                    )}

                    <br />
                    <Link to="/personality">
                      <Button
                        type="submit"
                        className="btn-round"
                        color="warning"
                        size="sm"
                        id="btn-personality"
                      >
                        ¿Por qué elegimos estás películas?
                      </Button>
                    </Link>
                  </>
                )}
                <Row>
                  <div className="movie-cards">{movies}</div>
                </Row>
              </div>

              {/* Movie modal */}
              {this.state.movieDetail && (
                <MovieModal
                  isOpen={this.state.modal}
                  toggle={() => this.toggleModal("modal")}
                  title={this.state.movieDetail.title}
                  overview={this.state.movieDetail.overview}
                  background={`http://image.tmdb.org/t/p/w500/${
                    this.state.movieDetail.backdrop
                  }`}
                  release={this.state.movieDetail.release}
                  posterPath={this.state.movieDetail.posterPath}
                  favorite={this.favoriteHandler}
                  backdrop={this.state.movieDetail.backdrop}
                />
              )}
              {/* SweetalertComponent */}
              <SweetAlert
                show={this.state.showAlert}
                title="Agregada a favoritos"
                type="success"
                onConfirm={() => this.setState({ showAlert: false })}
              />

              {/* Error alert */}
              <SweetAlert
                show={this.state.showError}
                title="El usuario de twitter no existe"
                text="Por favor verifícalo e intenta otra vez"
                type="error"
                onConfirm={() => this.setState({ showError: false })}
              />

              {/* Duplicate favorite Alert */}
              <SweetAlert
                show={this.state.showDuplicate}
                title="Ya agregaste esta película a favoritos con anterioridad"
                type="info"
                onConfirm={() => this.setState({ showDuplicate: false })}
              />

              {/* Not enough words alert */}
              <SweetAlert
                show={this.state.showErrorIBM}
                title={this.state.errorIBMTitle}
                text={this.state.errorIBMText}
                type="error"
                onConfirm={() =>
                  this.setState({
                    showErrorIBM: false,
                    errorIBMTitle: "",
                    errorIBMText: "",
                  })
                }
              />
            </>
          ) : (
            <Loading loadingmsg={"Trabajando en las recomendaciones"} />
          )}
        </div>
      </div>
    );
  }
}

export default Recommendations;
