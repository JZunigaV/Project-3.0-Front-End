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
        const baseImage = "http://image.tmdb.org/t/p/w185/";

        return subArray.map((movie, index) => {
          return (
            <Col lg="3" md="3" className="col-sm">
              <div key={movie.id}>
                <img
                  className="img-fluid rounded shadow-lg"
                  src={`${baseImage}${movie.poster_path}`}
                  alt="movie.title"
                />
                <h1>{movie.title}</h1>
              </div>
            </Col>
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
                  <Form className="form" onSubmit={this.handleSearchForm}>
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
            <Row>{movies}</Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Recommendations;
