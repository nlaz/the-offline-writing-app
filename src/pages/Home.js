import React, { Component } from "react";
import clipboardCopy from "clipboard-copy";
import pluralize from "pluralize";
import { Link } from "react-router-dom";
import { logEvent } from "../components/GoogleAnalytics";

import { Offline, Online } from "react-detect-offline";

import "./Home.css";

class ResultScreen extends Component {
  state = { button1: "Copy to Clipboard" };

  onCopyPress = () => {
    this.setState({ button1: "Copied!" });
    this.props.onCopy();
    this.timer = setTimeout(
      () => this.setState({ button1: "Copy to Clipboard" }),
      600
    );
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };

  render() {
    const { numWords, onReset } = this.props;
    return (
      <div>
        <h1 className="dark-gray fw2 mb2 center" style={{ maxWidth: "450px" }}>
          You wrote{" "}
          <span className="green">{pluralize("word", numWords, true)}</span>{" "}
          without distractions.
        </h1>
        <div className="button-group flex flex-row-ns flex-column ph4 items-center">
          <button
            onClick={this.onCopyPress}
            className="bg-dark-gray ba bw1 f6 b--dark-gray hover-bg-near-black white fw6 br-pill pv3 ph4 mr3-ns mb3 pointer"
            style={{ width: "225px" }}
          >
            {this.state.button1}
          </button>
          <button
            onClick={onReset}
            className="ba bw1 b--dark-gray f6 dark-gray hover-bg-near-black hover-white fw6 br-pill pv3 ph4 pointer"
            style={{ width: "225px" }}
          >
            Start over
          </button>
        </div>
      </div>
    );
  }
}

const TitleScreen = () => (
  <div>
    <h1 className="dark-gray fw2 mb2">
      The <span className="text-green">Offline</span> Writing App
    </h1>
    <h3 className="f4 fw2 ma0 mid-gray mt1">
      Disable distractions and focus on writing.
    </h3>
  </div>
);

const TypingScreen = ({ value, onChange }) => (
  <div className="textarea w-100">
    <textarea
      className="dark-gray lh-copy f4 bg-washed-green"
      placeholder="Start typing..."
      value={value}
      onChange={onChange}
    />
  </div>
);

const Footer = ({ isFinished }) => (
  <div className="mid-gray ph4">
    <Offline>
      Turn your network connection back on when you're finished.
    </Offline>
    <Online>
      {isFinished
        ? "To resume writing turn off your network connection."
        : "Turn off your network connection to get started."}
    </Online>
  </div>
);

class Home extends Component {
  state = {
    value: localStorage.getItem("value") || ""
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({ value });
    localStorage.setItem("value", value);
  };

  onReset = () => {
    if (
      window.confirm("Are you sure you want to clear your work and start over?")
    ) {
      this.setState({ value: "" });
      localStorage.setItem("value", "");
      logEvent("Clicked the reset button.");
    }
  };

  onCopy = () => {
    const { value } = this.state;
    clipboardCopy(value);
    logEvent("Clicked the copy button.");
  };

  render() {
    const { value } = this.state;
    const numWords = value.trim().split(/\s+/).length;
    const isFinished = Boolean(value);

    return (
      <div className="app dark-gray courier pv5 relative">
        <div className="content ma4 ph4" style={{ maxWidth: "700px" }}>
          <Offline>
            <TypingScreen value={value} onChange={this.onChange} />
          </Offline>
          <Online>
            {!isFinished && <TitleScreen />}
            {isFinished && (
              <ResultScreen
                numWords={numWords}
                onCopy={this.onCopy}
                onReset={this.onReset}
              />
            )}
          </Online>
        </div>
        <div className="absolute ml4 mt4" style={{ left: 0, top: 0 }}>
          <Link
            className="link moon-gray hover-mid-gray f5 fw1 flex items-center"
            to="about"
          >
            <div
              className="ba bw1 br-100 f4 flex items-center justify-center mr2"
              style={{ width: "24px", height: "24px", lineHeight: "24px" }}
            >
              ?
            </div>
            About
          </Link>
        </div>
        <Footer isFinished={isFinished} />
      </div>
    );
  }
}

export default Home;
