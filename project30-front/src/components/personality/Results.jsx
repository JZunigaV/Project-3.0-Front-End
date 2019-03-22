import React, { Component } from "react";
import ResultsBigFive from "./ResultsBigFive";
import ResultsStength from "./ResultsStrength";

class Results extends Component {
  componentDidMount() {
    document.body.classList.toggle("landing-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  render() {
    return (
      <div>
        <h1 className="text-center" id="graph-title">
          Why did we choose those movies
        </h1>
        <h2 className="text-center">Personality details: The big 5</h2>

        <h4>Your analisys strength was:</h4>
        <ResultsStength
          wordCount={this.props.resultData["word_count"]}
          warnings={this.props.resultData["warnings"]}
        />
        <ResultsBigFive resultData={this.props.resultData["personality"]} />
      </div>
    );
  }
}

export default Results;
