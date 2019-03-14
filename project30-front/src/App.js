import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//Landing Page
import LandingPage from "./components/LandingPage";
//

import Signup from "./components/auth/Signup";
// import Register from "./components/Register";
import "./App.css";

class App extends Component {
  state = {
    newUser: {},
  };

  addUserHandler = newUser => {
    this.setState = {
      newUser: newUser,
    };
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" render={props => <LandingPage {...props} />} />

          {/* <Route
            path="/register"
            render={props => <Register addUser={this.addUserHandler} />}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
