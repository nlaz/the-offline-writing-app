import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import GoogleAnalytics from "./components/GoogleAnalytics";

const App = () => (
  <div className="">
    <Router>
      <div style={{ minHeight: "100vh" }}>
        <Route path="/" component={GoogleAnalytics} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
