import React from "react";

// reactstrap components
import {


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
            <Col md="12">
              <h1 className="title">TWEETFLICK•</h1>
              <p>Jesus zuñiga Ironhack 2019</p>
            </Col>
  
            
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
