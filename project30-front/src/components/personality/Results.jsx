import React, { Component } from "react";
import ResultsBigFive from "./ResultsBigFive";
import ResultsStength from "./ResultsStrength";

class Results extends Component {
  //Styles
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
            
        </h1>
        <h2 className="text-center">Los 5 grandes rasgos de tu personalidad</h2>

        <h4>La exactitud de análisis fue::</h4>
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
