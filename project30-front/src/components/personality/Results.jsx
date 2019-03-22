import React, { Component } from "react";
import ResultsBigFive from "./ResultsBigFive";
import ResultsStength from "./ResultsStrength";

class Results extends Component {
  render() {
    return (
      <div>
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
