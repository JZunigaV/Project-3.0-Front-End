import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//Landing Page
import LandingPage from "./components/LandingPage";
//SignUp
import Register from "./components/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;
