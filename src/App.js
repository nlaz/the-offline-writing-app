import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import GoogleAnalytics from "./components/GoogleAnalytics";

const App = () => (
  <div className="">
    <BrowserRouter>
      <div style={{ minHeight: "100vh" }}>
        <Route path="/" component={GoogleAnalytics} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default App;
