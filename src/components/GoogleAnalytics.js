import { Component } from "react";
import ReactGA from "react-ga";
import config from "../config";

ReactGA.initialize(config.googleAnalyticsKey);

export function logEvent(action) {
  ReactGA.event({
    category: "User",
    action: action
  });
}

class GoogleAnalytics extends Component {
  render() {
    ReactGA.set({ page: window.location.pathname + window.location.hash });
    ReactGA.pageview(window.location.pathname + window.location.hash);
    return null;
  }
}

export default GoogleAnalytics;
