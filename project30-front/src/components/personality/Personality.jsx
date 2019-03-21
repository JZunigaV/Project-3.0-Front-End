import React, { Component } from "react";
import Results from "./Results";
//Service
import RecommendationService from "../recommendations/RecommendationService";

class Personality extends Component {
  state = {
    responseData: {},
    isLoading: true,
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
        this.setState({ responseData: response });
        this.setState({ isLoading: false });
        console.log(this.state.responseData);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    console.log(this.props);

    if (!this.state.isLoading) {
      alert("Terminó de cargar");
    }

    return (
      <div>
        {!this.state.isLoading && (
          <Results resultData={this.state.responseData} />
        )}
      </div>
    );
  }
}

export default Personality;
