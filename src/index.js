import React, { Component } from "react";
import { Scene, Router } from "react-native-router-flux";
import Home from "./Home";
import Quiz from "./Quiz";
import Result from "./Result";

class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="Home" component={Home} title="Home" initial />
          <Scene key="Quiz" component={Quiz} title="Quiz" />
          <Scene key="Result" component={Result} title="Result" />
        </Scene>
      </Router>
    );
  }
}

export default App;
