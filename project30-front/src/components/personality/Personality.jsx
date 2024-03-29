import React, { Component } from "react";
import Results from "./Results";
//Service
import RecommendationService from "../recommendations/RecommendationService";
//Loading component
import Loading from "../Loading";
class Personality extends Component {
  state = {
    responseData: {},
    isLoading: true,
  };

  service = new RecommendationService();

  //Page is starting
  componentDidMount = () => {
    //Landing page style
    //Call api to get the personality insights data
    this.service
      .personalityInsights(this.props.twitterUsername)
      .then(response => {
        this.setState({ responseData: response });
        this.setState({ isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  };

  //Page is ending
  componentWillUnmount = () => {
    this.setState({ responseData: {}, isLoading: true });
  };
  render() {
    return (
      <div>
        {!this.state.isLoading ? (
          <Results resultData={this.state.responseData} />
        ) : (
          <Loading loadingmsg={"Graficando detalles de personalidad"} />
        )}
      </div>
    );
  }
}

export default Personality;
