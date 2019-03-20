import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//Landing Page
import LandingPage from "./components/LandingPage";
import ExamplesNavbar from "./components/Navbars/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import ProtectedRoute from "./components/auth/protected-route";
import Profile from "./components/Profile/Profile";
import Recommendations from "./components/recommendations/Recommendations"
import Footer from "./components/Footer/Footer";
import Personality from "./components/personality/Personality";

import "./App.css";

class App extends Component {
  state = {
    loggedUser: null,
    redirect: false,
    twitterUsername:""
  };
  service = new AuthService();

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  };

  getTheUser = userObj => {
    this.setState({ loggedUser: userObj, redirect: true });
  };

  componentWillMount() {
    this.fetchUser();
  }


  //personality handler
  setTwitter = (twitterUsername) => {
    debugger
    this.setState({twitterUsername:twitterUsername})
  }



  render() {
    const { redirect } = this.state;
    if (this.state.loggedUser) {
      return (
        <div className="App">
          {redirect ? this.setState({ redirect: false }) : ""}
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
            <ProtectedRoute
              exact
              path="/profile/:id"
              component={Profile}
              user={this.state.loggedUser}
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
             <Route
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
                        
            <Route
              exact
              path="/recommendations"
              render={() => <Recommendations  liftTwitter={this.setTwitter} user={this.state.loggedUser} />}
            />

            <Route
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
    }
  }
}

export default App;
