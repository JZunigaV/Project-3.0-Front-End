import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import ReactEcharts from "echarts-for-react";
import { convertToPercentage } from "../utils/helper";
import ResultsBigFiveFacet from "../personality/ResultsBigFiveFacet";

class ResultsBigFive extends Component {
  //Methods
  getOption = () => {
    const option = {
      tooltip: {},
      scale: true,
      radar: {
        name: {
          textStyle: {
            color: "#fff",
            fontSize: 13,
          },
        },
        //shape: "circle",
        indicator: [
          {
            name: this.props.resultData[0]["name"],
            max: 100,
          },
          { name: this.props.resultData[1]["name"], max: 100 },
          { name: this.props.resultData[2]["name"], max: 100 },
          { name: this.props.resultData[3]["name"], max: 100 },
          { name: this.props.resultData[4]["name"], max: 100 },
        ],
      },
      series: [
        {
          name: "The Big Five",
          type: "radar",
          symbolSize: "10",
          areaStyle: {
            normal: {
              opacity: 0.3,
            },
          },
          data: [
            {
              value: [
                convertToPercentage(this.props.resultData[0]["percentile"]),
                convertToPercentage(this.props.resultData[1]["percentile"]),
                convertToPercentage(this.props.resultData[2]["percentile"]),
                convertToPercentage(this.props.resultData[3]["percentile"]),
                convertToPercentage(this.props.resultData[4]["percentile"]),
              ],
            },
          ],
        },
      ],
    };

    return option;
  };

  render() {
    return (
      <div className="plot-wrapper">
        <Row className="plot-contents">
          <Col lg="12" md="12" sm="12" xs="12">
            <ReactEcharts
              option={this.getOption()}
              style={{ width: "100%", height: 600 }}
              className="react_for_echarts"
            />
            <div className="plot-description">
              <p className="lead">
                El modelo de los cinco grandes o modelo OCEAN es una de las
                formas más famosas de estructurar la personalidad. Se utiliza
                para la realización de multitud de estudios.
              </p>
              <ol>
                <li>
                  <strong>Amabilidad (Agreeableness )</strong>Es el grado en que
                  la persona se muestra respetuosa, tolerante y tranquila.
                </li>
                <li>
                  <strong>Responsabilidad (Conscientiousness) </strong> Refiere
                  a cuán centrado está el sujeto en sus objetivos, además de
                  cuán disciplinado se muestra para la consecución de dichos
                  fines.{" "}
                </li>
                <li>
                  <strong>Extraversión (Extraversion )</strong> Define el grado
                  en que el sujeto se muestra abierto con los demás y canaliza
                  su energía en contextos sociales.{" "}
                </li>
                <li>
                  <strong>Estabilidad emocional (Neuroticism) </strong>Define en
                  qué grado una persona afronta sin problema las situaciones
                  complicadas de la vida. Los sujetos tranquilos, no muy
                  proclives a sentir rabia o a enfadarse, suelen permanecer
                  animados y gestionan muy bien sus crisis personales.
                </li>
                <li>
                  <strong>Apertura a la Experiencia (Openness)</strong> Muestra
                  en qué grado un sujeto tiende a buscar nuevas experiencias
                  personales y concibe de una manera creativa su futuro.{" "}
                </li>
              </ol>
              <p>
                Cada uno de estos rubros se divide en 6 subcategorias las cuales
                son:
              </p>
            </div>
          </Col>
        </Row>
        {/* {End of the first row} */}

        {/* Second Row */}
        <Row className="plot-contents plot-facets">
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">Amabilidad (Agreeableness)</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[3]["name"]}
              resultData={this.props.resultData[3]["children"]}
            />
            {/* <div className="plot-description-facet">
              <strong>Altruism</strong> Find that helping others is genuinely
              rewarding, that doing things for others is a form of
              self-fulfillment rather than self-sacrifice.
              <br />
              <strong>Cooperation</strong> Dislike confrontation. They are
              perfectly willing to compromise or to deny their own needs to get
              along with others.
              <br />
              <strong>Modesty</strong> Are unassuming, rather self-effacing, and
              humble. However, they do not necessarily lack self-confidence or
              self-esteem.
              <br />
              <strong>Uncompromising</strong> See no need for pretense or
              manipulation when dealing with others and are therefore candid,
              frank, and genuine.
              <br />
              <strong>Sympathy</strong> Are tender-hearted and compassionate.
              <br />
              <strong>Trust</strong> Assume that most people are fundamentally
              fair, honest, and have good intentions. They take people at face
              value and are willing to forgive and forget.
            </div> */}
          </Col>
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">Responsabilidad (Conscientiousness)</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[1]["name"]}
              resultData={this.props.resultData[1]["children"]}
            />
            {/* <div className="plot-description-facet">
              <strong>Achievement striving</strong> Try hard to achieve
              excellence. Their drive to be recognized as successful keeps them
              on track as they work hard to accomplish their goals.
              <br />
              <strong>Cautiousness</strong> Are disposed to think through
              possibilities carefully before acting.
              <br />
              <strong>Dutifulness</strong> Have a strong sense of duty and
              obligation.
              <br />
              <strong>Orderliness</strong> Are well-organized, tidy, and neat.
              <br />
              <strong>Self-discipline</strong> Have the self-discipline, or
              "will-power," to persist at difficult or unpleasant tasks until
              they are completed.
              <br />
              <strong>Self-efficacy</strong> Are confident in their ability to
              accomplish things.
              <br />
            </div> */}
          </Col>
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">Extraversión (Extraversion)</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[2]["name"]}
              resultData={this.props.resultData[2]["children"]}
            />
            {/* <div className="plot-description-facet">
              <strong>Activity level</strong> Lead fast-paced and busy lives.
              They do things and move about quickly, energetically, and
              vigorously, and they are involved in many activities.
              <br />
              <strong>Assertiveness</strong> Like to take charge and direct the
              activities of others. They tend to be leaders in groups.
              <br />
              <strong>Cheerfulness</strong> Experience a range of positive
              feelings, including happiness, enthusiasm, optimism, and joy.
              <br />
              <strong>Excitement-seeking</strong> Are easily bored without high
              levels of stimulation.
              <br />
              <strong>Outgoing</strong> Genuinely like other people and openly
              demonstrate positive feelings toward others.
              <br />
              <strong>Gregariousness</strong> Find the company of others
              pleasantly stimulating and rewarding. They enjoy the excitement of
              crowds.
            </div> */}
          </Col>
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">Estabilidad emocional (Neuroticism)</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[4]["name"]}
              resultData={this.props.resultData[4]["children"]}
            />
            {/* <div className="plot-description-facet">
              <strong>Fiery</strong> Have a tendency to feel angry.
              <br />
              <strong>Prone to worry </strong> Often feel like something
              unpleasant, threatening, or dangerous is about to happen. The
              "fight-or-flight" system of their brains is too easily and too
              often engaged.
              <br />
              <strong>Melancholy</strong> Tend to react more readily to life's
              ups and downs.
              <br />
              <strong>Immoderation</strong> Feel strong cravings and urges that
              they have difficulty resisting, even though they know that they
              are likely to regret them later. They tend to be oriented toward
              short-term pleasures and rewards rather than long-term
              consequences.
              <br />
              <strong>Self-consciousness</strong> Are sensitive about what
              others think of them. Their concerns about rejection and ridicule
              cause them to feel shy and uncomfortable around others; they are
              easily embarrassed.
              <br />
              <strong>Susceptible to stress</strong> Have difficulty coping with
              stress. They experience panic, confusion, and helplessness when
              under pressure or when facing emergency situations.
              <br />
            </div> */}
          </Col>
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">
              Apertura a la Experiencia (Openness)
            </h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[0]["name"]}
              resultData={this.props.resultData[0]["children"]}
            />
            {/* <div className="plot-description-facet">
              <strong>Adventurousness</strong> Are eager to try new activities
              and experience different things. They find familiarity and routine
              boring.
              <br />
              <strong>Artistic interests </strong> Love beauty, both in art and
              in nature. They become easily involved and absorbed in artistic
              and natural events. With intellect, this facet is one of the two
              most important, central aspects of this characteristic.
              <br />
              <strong>Emotionality</strong> Have good access to and awareness of
              their own feelings.
              <br />
              <strong>Imagination</strong> View the real world as often too
              plain and ordinary. They use fantasy not as an escape but as a way
              of creating for themselves a richer and more interesting
              inner-world.
              <br />
              <strong>Intellect</strong> Are intellectually curious and tend to
              think in symbols and abstractions. With artistic interests, this
              facet is one of the two most important, central aspects of this
              characteristic.
              <br />
              <strong>Authority challenging</strong> Have a readiness to
              challenge authority, convention, and traditional values.
            </div> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ResultsBigFive;
