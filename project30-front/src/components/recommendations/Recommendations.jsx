import React from "react";
import classnames from "classnames";
//Service
import RecommendationService from "./RecommendationService";

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
  // Container
} from "reactstrap";

class Recommendations extends React.Component {
  //Class part
  state = {
    twitterUsername: "",
    recommendations: [],
  };

  componentDidMount() {
    document.body.classList.toggle("landing-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  //Service instance
  service = new RecommendationService();

  //Form handle methods
  onChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSearchForm = event => {
    debugger;
    event.preventDefault();
    const twitterUsername = this.state.twitterUsername;

    this.service
      .movieRecommendations(twitterUsername)
      .then(response => {
        this.setState({ recommendations: response });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    //Javascript

    if (this.state.recommendations.length > 0) {
      var movies = this.state.recommendations.map(subArray => {
        return subArray.map((movie, index) => {
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
                <CardTitle tag="h3">{movie.original_title}</CardTitle>
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
          <div className="page-header-recommendation">
            <div className="content-center">
              <Row className="">
                <Col lg="12" md="12">
                  <Form
                    className="form form-recommend"
                    onSubmit={this.handleSearchForm}
                    id="input-form"
                  >
                    <h1>Recommendations</h1>

                    {/* twitter username */}
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.fullNameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fab fa-twitter" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Twitter username"
                        type="text"
                        name="twitterUsername"
                        onChange={this.onChange}
                        value={this.state.username}
                        onFocus={e => this.setState({ fullNameFocus: true })}
                        onBlur={e => this.setState({ fullNameFocus: false })}
                      />
                    </InputGroup>

                    <Button
                      type="submit"
                      className="btn-round"
                      color="success"
                      size="lg"
                    >
                      Lets go
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>

          <div className="content-center">
            <Col lg="4" md="4" className="col-sm" />
            {this.state.recommendations.length > 0 ? (
              <h1>Here are some movies you may like</h1>
            ) : (
              ""
            )}
            <Row>{movies}</Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Recommendations;
