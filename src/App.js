import React, { Component } from "react";

import Tasks from "./Tasks";
import Lists from "./Lists";

import "./group.png";
import "./mystyle.css";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact={true} path="/" component={Lists} />
          <Route path="/tasks/:id" component={Tasks} />
        </Switch>
      </div>
    );
  }
}

export default App;
