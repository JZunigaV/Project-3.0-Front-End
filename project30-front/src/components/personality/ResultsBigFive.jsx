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
                  <strong>Amabilidad</strong>Es el grado en que la persona se
                  muestra respetuosa, tolerante y tranquila.
                </li>
                <li>
                  <strong>Responsabilidad </strong> Refiere a cuán centrado está
                  el sujeto en sus objetivos, además de cuán disciplinado se
                  muestra para la consecución de dichos fines.{" "}
                </li>
                <li>
                  <strong>Extroversión</strong> Define el grado en que el sujeto
                  se muestra abierto con los demás y canaliza su energía en
                  contextos sociales.{" "}
                </li>
                <li>
                  <strong>Rango emocional</strong>Define en qué grado una
                  persona afronta sin problema las situaciones complicadas de la
                  vida.
                </li>
                <li>
                  <strong>Apertura a experiencias</strong> Muestra en qué grado
                  un sujeto tiende a buscar nuevas experiencias personales y
                  concibe de una manera creativa su futuro.{" "}
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
            <h2 className="text-center">Empatía</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[3]["name"]}
              resultData={this.props.resultData[3]["children"]}
            />
            <div className="plot-description-facet">
              <strong>Altruismo</strong> Tienen la tendencia a procurar el bien
              de las personas de manera desinteresada, incluso a costa del
              interés propio.
              <br />
              <strong>Confianza</strong> Asumen que la mayoría de las personas
              son justas, honestas, y tienen buenas intenciones.están dispuestas
              a perdonar y olvidar.
              <br />
              <strong>Compasión</strong> Son tiernos y compasivos.
              <br />
              <strong>Intransigencia</strong> No ven la necesidad de pretender o
              manipular cuando conviven con otros, por lo tanto son francos y
              genuinos
              <br />
              <strong>Modestia</strong> Son sencillos, y humildes, sin embargo,
              no necesariamente carecen de confianza en sí mismos o baja
              autoestima.
              <br />
              <strong>Cooperación</strong> No les gusta la confrontación. están
              dispuestos a transigir o negar sus propias necesidades para
              llevarse bien con los demás.
              <br />
            </div>
          </Col>
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">Responsabilidad</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[1]["name"]}
              resultData={this.props.resultData[1]["children"]}
            />
            <div className="plot-description-facet">
              <strong>Necesidad de éxito</strong>
              Siempre tratan de lograr la excelencia,Su impulso para ser
              reconocido como exitoso los mantiene en el camino mientras
              trabajan duro para lograr sus objetivos.
              <br />
              <strong>Autoeficacia</strong> Confían en su capacidad para
              alcanzar objetivos.
              <br />
              <strong>Autodisciplina</strong> Tienen la "fuerza de voluntad",
              para persistir en tareas difíciles o desagradables hasta se hayan
              completado
              <br />
              <strong>Disciplina</strong>
              Tienen un fuerte sentido del deber y obligación.
              <br />
              <strong>Obediencia</strong>
              Están bien organizados y ordenados.
              <br />
              <strong>Cautela</strong>Están dispuestos a pensar las diferentes
              posibilidades cuidadosamente antes de actuar.
              <br />
            </div>
          </Col>
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">Extroversión</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[2]["name"]}
              resultData={this.props.resultData[2]["children"]}
            />
            <div className="plot-description-facet">
              <strong>Nivel de actividad</strong>
              Llevan vidas rápidas y ocupadas. Se mueven rápidamente,
              enérgicamente, y están involucrados en muchas actividades.
              <br />
              <strong>Sociabilidad</strong> Encuentran la compañía de los demás
              estimulante y gratificante.
              <br />
              <strong>Seguridad en uno mismo</strong>
              Les gusta hacerse cargo y dirigir las actividades de otros.
              Tienden a ser líderes en grupos.
              <br />
              <strong>Alegría</strong>
              Experimentan un rango de sentimientos positivos incluyendo la
              felicidad, el entusiasmo, el optimismo y la alegría.
              <br />
              <strong>Búsqueda de emociones</strong> Se aburren fácilmente sin
              la altos niveles de estimulación.
              <br />
              <strong>Simpatía</strong> Se llevan bien con otras personas y
              demuestran abiertamente sentimientos positivos hacia los demás.
              <br />
            </div>
          </Col>
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">Estabilidad emocional</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[4]["name"]}
              resultData={this.props.resultData[4]["children"]}
            />
            <div className="plot-description-facet">
              <strong>Vehemencia</strong> Tienen la tendencia a sentirse
              enojados.
              <br />
              <strong>Susceptibilidad a la tensión </strong>
              Tienen dificultad sobrellevar el estrés. Experimentan pánico,
              confusión e impotencia ante presiones o situaciones de emergencia.
              <br />
              <strong>Timidez</strong>
              Son sensibles a lo que otros piensan de ellos. Sus preocupaciones
              sobre el rechazo y el ridículo lose hacen que sentirse incómodos
              con los demás; se sienten apenados con facilidad.
              <br />
              <strong>Desmesura</strong> Sienten fuertes antojos y urgencias que
              no pueden resistir facilmente, aunque saben que es probable que se
              arrepientan más tarde. Tienden a orientarse hacia Placeres y
              recompensas a corto plazo en lugar de a largo plazo.
              <br />
              <strong>Melancolía</strong> Tienden a reaccionar fuertemente a las
              subidas y bajadas de la vida.
              <br />
              <strong>Tendencia a la preocupación</strong>
              A menudo se sienten que algo desagradable, amenazante o peligroso
              está a punto de ocurrir. El sistema de "lucha o huida" se activa
              facilmente y con mucha frecuencia en sus cerebros.
              <br />
            </div>
          </Col>
          <Col lg="6" md="12" sm="12" xs="12" className="plot-facet">
            <h2 className="text-center">Apertura a la Experiencia</h2>
            <ResultsBigFiveFacet
              chartTitle={this.props.resultData[0]["name"]}
              resultData={this.props.resultData[0]["children"]}
            />
            <div className="plot-description-facet">
              <strong>Audacia</strong>
              Están ansiosos por probar nuevas actividades y experimentar cosas
              diferentes. Encuentran en la familiaridad y rutina algo aburrido.
              <br />
              <strong>Desafío a la autoridad</strong>
              Tienen una disposición para desafiar las convenciónes y valores
              tradicionales.
              <br />
              <strong>Intelecto</strong>
              Son intelectualmente curiosos y tienden a pensar en símbolos y
              abstracciones con intereses artísticos.
              <br />
              <strong>Imaginación</strong>
              Ven el mundo real a menudo muy sencillo y ordinario. Usan la
              fantasía no como un escape sino como un camino para crear por sí
              mismos un rico y más interesante mundo interior.
              <br />
              <strong>Emocionalidad</strong>
              Tienen una conciencia plena de sus propios sentimientos.
              <br />
              <strong>Intereses artísticos</strong>
              Aman la belleza, tanto en arte como en en naturaleza. Se
              involucran fácilmente en el arte.
              <br />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ResultsBigFive;
