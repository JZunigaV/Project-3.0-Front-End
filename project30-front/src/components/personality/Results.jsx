import React, { Component } from "react";
import ResultsBigFive from "./ResultsBigFive";

class Results extends Component {
  render() {
    return (
      <div>
        <ResultsBigFive resultData={this.props.resultData["personality"]} />
      </div>
    );
  }
}

export default Results;
