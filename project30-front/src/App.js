import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

//Landing Page
import LandingPage from "./components/LandingPage";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" render={props => <LandingPage {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
