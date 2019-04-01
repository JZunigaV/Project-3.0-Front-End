import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//Landing Page
import LandingPage from "./components/LandingPage";
import ExamplesNavbar from "./components/Navbars/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import ProtectedRoute from "./components/auth/protected-route";
//Profile routes
import Profile from "./components/Profile/Profile";
import Recommendations from "./components/recommendations/Recommendations";
import Footer from "./components/Footer/Footer";
import Personality from "./components/personality/Personality";
import "./App.css";

class App extends Component {
  state = {
    loggedUser: null,
    redirect: false,
    twitterUsername: "",
    avatarUrl: "",
    profileBio: "",
  };
  service = new AuthService();

  fetchUser = () => {
    if (this.state.loggedUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedUser: response,
          });
        })
        .catch(err => {
          this.setState({
            loggedUser: false,
          });
        });
    }
  };

  getTheUser = userObj => {
    this.setState({ loggedUser: userObj, redirect: true });
  };

  //personality handler
  setTwitter = twitterUsername => {
    this.setState({ twitterUsername: twitterUsername });
  };

  //Avatar Url
  setAvatar = liftedAvatarUrl => {
    let loggedUser = { ...this.state.loggedUser };
    loggedUser.avatarUrl = liftedAvatarUrl;
    this.setState({ loggedUser });
  };

  //Profile
  setTwitterProfile = twitterProfileUsername => {
    this.service.updateTwitter(
      this.state.loggedUser._id,
      twitterProfileUsername,
    );

    let loggedUser = { ...this.state.loggedUser };
    loggedUser.twitterUsername = twitterProfileUsername;
    this.setState({ loggedUser });
  };

  render() {
    this.fetchUser();
    const { redirect } = this.state;
    if (this.state.loggedUser) {
      return (
        <div className="App">
          {redirect && this.setState({ redirect: false })}
          {redirect ? <Redirect push to="/" /> : ""}

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

            {/* Profile routes */}
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              user={this.state.loggedUser}
              liftAvatar={this.setAvatar}
              liftProfile={this.setTwitterProfile}
            />

            {/* Tiene que ser una ruta protegida */}
            <ProtectedRoute
              exact
              path="/recommendations"
              component={Recommendations}
              user={this.state.loggedUser}
              liftTwitter={this.setTwitter}
            />

            {/* Tiene que ser una ruta protegida */}
            <ProtectedRoute
              exact
              path="/personality"
              component={Personality}
              user={this.state.loggedUser}
              twitterUsername={this.state.twitterUsername}
            />
          </Switch>
          <Footer />
        </div>
      );
    } else {
      // Public routes
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

            <ProtectedRoute
              exact
              path="/recommendations"
              component={Recommendations}
              user={this.state.loggedUser}
              liftTwitter={this.setTwitter}
            />

            <ProtectedRoute
              exact
              path="/personality"
              render={() => (
                <Personality
                  twitterUsername={this.state.twitterUsername}
                  user={this.state.loggedUser}
                />
              )}
            />

            {/* Profile routes */}
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              user={this.state.loggedUser}
              liftAvatar={this.setAvatar}
              liftProfile={this.setTwitterProfile}
            />
          </Switch>

          <Footer />
        </div>
      );
    }
  }
}

export default App;
