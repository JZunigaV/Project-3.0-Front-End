import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
  //   UncontrolledCarousel,
} from "reactstrap";

// core components

// import Carousel from "./Carousel";

class LandingPage extends React.Component {
  //Class part

  componentDidMount() {
    document.body.classList.toggle("landing-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  render() {
    //Javascript

    return (
      <div>
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="path"
              src={require("../assets/img/blob.png")}
            />
            <img
              alt="..."
              className="path2"
              src={require("../assets/img/path2.png")}
            />
            <img
              alt="..."
              className="shapes triangle"
              src={require("../assets/img/triunghiuri.png")}
            />
            <img
              alt="..."
              className="shapes wave"
              src={require("../assets/img/waves.png")}
            />
            <img
              alt="..."
              className="shapes squares"
              src={require("../assets/img/patrat.png")}
            />
            <img
              alt="..."
              className="shapes circle"
              src={require("../assets/img/cercuri.png")}
            />
            <div className="content-center">
              <Row className="row-grid justify-content-between align-items-center text-left">
                <Col lg="6" md="6">
                  <h1 className="text-white">
                    Encontraremos películas perfectas para ti
                    <br />
                  </h1>
                  <p className="text-white mb-3">
                    Usando Personality insights y twitter daremos
                    recomendaciones 100% personalizadas
                  </p>
                  <div className="btn-wrapper mb-3">
                    <Link to="/recommendations" className="btn btn-info">
                      Buscar peliculas
                    </Link>
                  </div>
                </Col>
                <Col lg="4" md="5">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("../assets/img/logo.png")}
                  />
                </Col>
              </Row>
            </div>
          </div>
          <section className="section section-lg">
            <h1 className="text-center">Recomendaciones 100% personalizadas</h1>
          </section>

          <section className="section section-lg">
            <img
              alt="..."
              className="path"
              src={require("../assets/img/path4.png")}
            />
            <img
              alt="..."
              className="path2"
              src={require("../assets/img/path5.png")}
            />
            <img
              alt="..."
              className="path3"
              src={require("../assets/img/path2.png")}
            />
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <h1 className="text-center">
                    Así es como funciona TWEETFLICK
                  </h1>
                  <Row className="row-grid justify-content-center">
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-primary">
                          <i className="fab fa-twitter" />
                        </div>
                        <h4 className="info-title">
                          1-Escribe tu usuario de Twitter
                        </h4>
                        <hr className="line-primary" />
                        <p>
                          Utilizaremos el usuario para obtener datos sobre tu
                          personalidad con el Api de personality insights
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-warning">
                          <i className="tim-icons icon-atom" />
                        </div>
                        <h4 className="info-title">
                          2- Calcularemos las películas que más te podrian
                          gustar
                        </h4>
                        <hr className="line-warning" />
                        <p>
                          nuestro sistema obtendrá las peliculas de una gran
                          base de datos
                        </p>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="tim-icons icon-tv-2" />
                        </div>
                        <h4 className="info-title">
                          3- Aparecerán las recomendaciones
                        </h4>
                        <hr className="line-success" />
                        <p>
                          Nuestro sistema te dará un catálogo de películas que
                          te podrían gustar, dependiendo de nuestro análisis.Si
                          agregas alguna como favorita encontrarás en donde está
                          disponible!
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="section section-lg section-safe">
            <img
              alt="..."
              className="path"
              src={require("../assets/img/path5.png")}
            />
            <Container>
              <Row className="row-grid justify-content-between">
                <Col md="5">
                  <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("../assets/img/movies.jpg")}
                  />
                  <Card className="card-stats bg-danger">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">100%</CardTitle>
                          <p className="card-category text-white">Seguro</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="card-stats bg-info">
                    <CardBody>
                      <div className="justify-content-center">
                        <div className="numbers">
                          <CardTitle tag="p">Más de 133,000 películas</CardTitle>
                          <p className="card-category text-white">
                            En nuestra base de datos
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
             
                </Col>
                <Col md="6">
                  <div className="px-md-5">
                    <hr className="line-success" />
                    <h3>Funcionalidades increibles</h3>
                    <p>
                      Olvida pasar horas buscando una película que te interese,
                      con tweetflick la encontrarás rápidamente.
                    </p>
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-success mb-2">
                            <i className="tim-icons icon-vector" />
                          </div>
                          <div className="ml-3">
                            <h6>Conexiones hacia proovedores de streaming</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div className="icon icon-success mb-2">
                            <i className="tim-icons icon-tap-02" />
                          </div>
                          <div className="ml-3">
                            <h6>Funcionalidad intuitiva</h6>
                          </div>
                        </div>
                      </li>
            
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    );
  }
}

export default LandingPage;
