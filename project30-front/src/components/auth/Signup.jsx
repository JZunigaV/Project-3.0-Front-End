import React from "react";
import classnames from "classnames";
import AuthService from "./AuthService";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

//SweetAlert
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";

class Signup extends React.Component {
  state = {
    //Design properties
    squares1to6: "",
    squares7and8: "",

    //Form properties
    username: "",
    email: "",
    password: "",
    errorText: "",
    showError: false,
  };

  service = new AuthService();

  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }

  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor,
    );
  }
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)",
    });
  };

  //Form methods
  onChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  //Register form
  handleRegisterForm = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    this.service
      .signup(username, password, email)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          email: "",
        });
        this.props.getUser(response);
      })
      .catch(error =>
        this.setState({
          errorText: error.response.data.message,
          showError: true,
        }),
      );
  };
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("../../assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">Registro</CardTitle>
                      </CardHeader>

                      {/* Here we have our form  */}
                      <CardBody>
                        <Form
                          className="form"
                          onSubmit={this.handleRegisterForm}
                        >
                          {/* Username */}
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus,
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Usuario"
                              type="text"
                              name="username"
                              onChange={this.onChange}
                              value={this.state.username}
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ fullNameFocus: false })
                              }
                            />
                          </InputGroup>

                          {/* email */}
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.emailFocus,
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              name="email"
                              onChange={this.onChange}
                              value={this.state.email}
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={e => this.setState({ emailFocus: false })}
                            />
                          </InputGroup>

                          {/* Password */}
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus,
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              name="password"
                              onChange={this.onChange}
                              value={this.state.password}
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ passwordFocus: false })
                              }
                            />
                          </InputGroup>

                          <CardFooter>
                            <Button
                              type="submit"
                              className="btn-round"
                              color="primary"
                              size="lg"
                            >
                              Comenzar
                            </Button>
                          </CardFooter>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
              {/* Error alert */}
              <SweetAlert
                show={this.state.showError}
                title={this.state.errorText}
                type="error"
                onConfirm={() =>
                  this.setState({ showError: false, errorText: "" })
                }
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
