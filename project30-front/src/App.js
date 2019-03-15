import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

//Landing Page
import LandingPage from "./components/LandingPage";
import ExamplesNavbar from "./components/Navbars/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import ProtectedRoute from "./components/auth/protected-route";
import Profile from "./components/Profile/Profile";

import "./App.css";

class App extends Component {
  state = {
    loggedUser: null,
  };
  service = new AuthService();
  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser = userObj => {
    this.setState({ loggedUser: userObj });
  };

  render() {
    this.fetchUser();
    if (this.state.loggedUser) {
      debugger;
      return (
        <div className="App">
          {/*  NavBar */}

          <ExamplesNavbar
            userInSession={this.state.loggedUser}
            getUser={this.getTheUser}
          />

          <Switch>
            <Route
              exact
              path="/"
              render={props => <LandingPage {...props} />}
            />
            <ProtectedRoute
              user={this.state.loggedInUser}
              exact
              path="/profile/:id"
              component={Profile}
            />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          {/*  NavBar */}
          <ExamplesNavbar userInSession={this.state.loggedUser} />
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getTheUser} />}
          />
          <Switch>
            <Route
              exact
              path="/login"
              render={() => <Login getUser={this.getTheUser} />}
            />

            <Route
              exact
              path="/"
              render={props => <LandingPage {...props} />}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
