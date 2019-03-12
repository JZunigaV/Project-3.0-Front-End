import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

//Landing Page
import LandingPage from "./components/LandingPage";

//SignUp
import SignUp from "./components/SignUp";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route exact path="/login" component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
