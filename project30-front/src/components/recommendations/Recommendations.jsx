import React from "react";
import classnames from "classnames";

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
  Container
} from "reactstrap";

class Recommendations extends React.Component {
  //Class part
  state = {};
  componentDidMount() {
    document.body.classList.toggle("landing-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  render() {
    //Javascript

    return (
      <div>
        <div className="wrapper">
          {/* Header */}
          <div className="page-header-recommendation">
            <div className="content-center">
              <Row className="">
                <Col lg="12" md="12">
                  <Form className="form">


                    <h1>Recommendations</h1>

                    {/* twitter username */}
                    <InputGroup
                      className={classnames({
                        "input-group-focus": this.state.fullNameFocus
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
                        name="username"
                        onChange={this.onChange}
                        value={this.state.username}
                        onFocus={e => this.setState({ fullNameFocus: true })}
                        onBlur={e => this.setState({ fullNameFocus: false })}
                      />
                    </InputGroup>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recommendations;
