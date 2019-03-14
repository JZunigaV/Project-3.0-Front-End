import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//Landing Page
import LandingPage from "./components/LandingPage";
//
import ExamplesNavbar from "./components/Navbars/ExamplesNavbar";

import Signup from "./components/auth/Signup";
// import Register from "./components/Register";
import "./App.css";

class App extends Component {
  state = {
    loggedUser: null
  };

  getTheUser = userObj => {
    this.setState({ loggedUser: userObj });
  };

  render() {
    return (
      <div className="App">
        {/*  NavBar */}
        <ExamplesNavbar userInSession={this.state.loggedUser}/>
        <Switch>
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getTheUser} />}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" render={props => <LandingPage {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
