import React, { Component } from "react";
import { Container, Tooltip, Badge, Alert } from "reactstrap";

class ResultsStrength extends Component {
  state = {
    tooltipOpen: false,
    strengthClass: "",
    strengthLabel: "",
  };

  toggleTooltip = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  };

  //When the component first starts
  componentWillMount = () => {
    if (this.props.wordCount < 600) {
      this.setState({
        strengthClass: "analysis-weak",
        strengthLabel: "Análisis deébil",
      });
    } else if (this.props.wordCount >= 600 && this.props.wordCount < 1200) {
      this.setState({
        strengthClass: "analysis-moderate",
        strengthLabel: "Análisis moderado",
      });
    } else if (this.props.wordCount > 1200 && this.props.wordCount < 6000) {
      this.setState({
        strengthClass: "analysis-strong",
        strengthLabel: "Análisis fuerte",
      });
    } else if (this.props.wordCount >= 6000) {
      this.setState({
        strengthClass: "analysis-very-strong",
        strengthLabel: "Análisis muy fuerte",
      });
    }
  };

  render() {
    //Javascript
    console.log(this.props.wordCount);

    return (
      <div>
        <Container className="result-strength-container">
          <div className="icon-brain">
            <div className="icon-brain-container">
              {/* Aqui podria ir una imagen */}
              {/* <h1>Hola</h1> */}
            </div>

            <div className="analysis-strength">
              <div id="analysisStrengthTooltip">
                <Badge className={this.state.strengthClass} color="danger">
                  {this.state.strengthLabel}
                </Badge>
              </div>
              <Tooltip
                className="analysis-strength-toolip"
                placement="top"
                isOpen={this.state.tooltipOpen}
                target="analysisStrengthTooltip"
                toggle={this.toggleTooltip}
              >
                La exactitud del análisis está determinada por el conteo de
                palabras obtenidas de Twitter
                <br />
                Débil &lt; 600 palabras. <br />
                Moderado &lt; 1,200 palabras. <br />
                Fuerte &gt; 1,200 palabras.
                <br />
                Muy fuerte &gt; 6,000 palabras.
              </Tooltip>
            </div>
          </div>
          {this.props.warnings.map(warning => {
            return (
              <Alert className="result-msg" color="warning">
                {warning.message}
              </Alert>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default ResultsStrength;
