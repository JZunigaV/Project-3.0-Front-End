import React, { Component } from "react";
import { Row, Col } from "reactstrap";

//Service
import RecommendationService from "../recommendations/RecommendationService";

class Personality extends Component {
  state = {
    personality: {},
  };

  service = new RecommendationService();

  componentDidMount() {
    //Landing page style
    document.body.classList.toggle("landing-page");

    //Call api to get the personality insights data
    debugger;
    this.service
      .personalityInsights(this.props.twitterUsername)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <div className="wrapeer">
          <div className="page-header-recommendation">
            <div className="content-center">
              <Row>
                <Col>
                  <h1>Holaaaa {this.props.twitterUsername}</h1>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Personality;
