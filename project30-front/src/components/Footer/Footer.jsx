import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {

  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,

} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md="3">
              <h1 className="title">TWEETFLICK•</h1>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink to="/" tag={Link}>
                    Home
                  </NavLink>
                </NavItem>
        

              </Nav>
            </Col>
            <p>Jesus zuñiga Ironhack 2019</p>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
