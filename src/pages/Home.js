import React, { Component } from "react";
import clipboardCopy from "clipboard-copy";
import wordsCount from "words-count";
import pluralize from "pluralize";

import "./Home.css";

const ResultScreen = ({ numWords, onCopy, onReset }) => (
  <div>
    <h1 className="dark-gray fw2 mb2 center" style={{ maxWidth: "450px" }}>
      You wrote{" "}
      <span className="green">{pluralize("word", numWords, true)}</span> without
      distractions.
    </h1>
    <div className="button-group flex">
      <button
        onClick={onCopy}
        className="bg-dark-gray ba bw1 b--dark-gray hover-bg-near-black hover-b--dark-green white fw6 br-pill pv2 ph4 mr3 pointer"
      >
        Copy to Clipboard
      </button>
      <button
        onClick={onReset}
        className="ba bw1 b--dark-gray dark-gray hover-bg-near-black hover-white fw6 br-pill pv3 ph4 pointer"
      >
        Start Over
      </button>
    </div>
  </div>
);

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
  <div className="textarea w-100" style={{ height: "700px" }}>
    <textarea
      className="dark-gray lh-copy f4"
      placeholder="Start typing..."
      value={value}
      onChange={onChange}
    />
  </div>
);

const Footer = ({ isOnline, isFinished }) => (
  <div className="App-footer">
    <span className="mid-gray">
      {!isOnline &&
        "Turn your network connection back on when you're finished."}
      {isOnline && (
        <div>
          {isFinished
            ? "Turn off your network connection resume writing."
            : "Turn off your network connection to get started."}
        </div>
      )}
    </span>
  </div>
);

class Home extends Component {
  state = {
    online: window.navigator.onLine,
    value: localStorage.getItem("value") || ""
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({ value });
    localStorage.setItem("value", value);
  };

  onReset = () => {
    this.setState({ value: "" });
    localStorage.setItem("value", "");
  };

  onCopy = () => {
    const { value } = this.state;
    clipboardCopy(value);
  };

  render() {
    const { online, value } = this.state;
    const numWords = wordsCount(value);
    const isFinished = !!value;
    const isOnline = !!online;

    return (
      <div className="app dark-gray courier pv5">
        <div className="content mv4">
          {!isOnline && <TypingScreen value={value} onChange={this.onChange} />}
          {isOnline && !isFinished && <TitleScreen />}
          {isOnline && isFinished && (
            <ResultScreen
              numWords={numWords}
              onCopy={this.onCopy}
              onReset={this.onReset}
            />
          )}
        </div>
        <Footer isOnline={isOnline} isFinished={isFinished} />
      </div>
    );
  }
}

export default Home;
