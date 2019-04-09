import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class PagesNavbar extends React.Component {
  state = {
    collapseOpen: false,
    color: "navbar-transparent",
    loggedInUser: null,
  };

  service = new AuthService();

  //Aqui agarra al usuario que está actualmente logeado
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  //Metodos esteticos
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }

  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info",
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent",
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out",
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: "",
    });
  };

  //Metodos condicionales que se pondran dependiendo del estado del usuario logeado

  renderSignup = () => {
    return (
      <>
        <NavItem>
          <NavLink tag={Link}  to="/signup">
            Registrarse
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link}  to="/login">
            Entrar
          </NavLink>
        </NavItem>
      </>
    );
  };

  profileElement = username => {
    return (
      <>
        <NavItem>
          <NavLink tag={Link}  to="/" onClick={() => this.logoutUser()}>
            Logout
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link}  to={`/profile`}>
            Hola, {username}
          </NavLink>
        </NavItem>
      </>
    );
  };

  //Metodo que pondrá el link de la funcionalidad de recomendaciones si el usuario está logeado
  moviesElement = () => {
    return (
      <>
        <NavItem>
          <NavLink tag={Link}  to={`/recommendations`}>
            Recomendaciones
          </NavLink>
        </NavItem>
      </>
    );
  };

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  };

  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title="Recommendation system from ironhack"
              tag={Link}
            >
              <span>TWEETFLICK• </span>
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title="Recommendation system from ironhack"
              tag={Link}
            >
              <span>TWEETFLICK• </span>
            </NavbarBrand>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
         

              {/* if the user is logged the user appears */}

              {this.state.loggedInUser
                ? this.profileElement(
                    this.state.loggedInUser.username,
                    this.state.loggedInUser._id,
                  )
                : this.renderSignup()}

              {/* si el usuario esta logeado recomendaciones aparecen */}
              {this.state.loggedInUser && this.moviesElement()}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default PagesNavbar;
