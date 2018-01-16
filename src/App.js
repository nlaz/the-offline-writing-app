import React, { Component, Fragment } from "react";
import "./App.css";

class App extends Component {
  state = { online: false, value: localStorage.getItem("value") || "" };

  componentWillMount() {
    this.tryRequest();
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({ value });
    localStorage.setItem("value", value);
  };

  onReset = () => {
    this.setState({ value: "" });
    localStorage.setItem("value", "");
  };

  tryRequest = () => {
    const request = new window.XMLHttpRequest();
    request.open("HEAD", "https://media.giphy.com/media/l0CLT093l7GTtNucU/giphy.gif", true);
    request.timeout = 5750;

    request.addEventListener("load", event => {
      console.log("We seem to be online!", event);
      this.setState({ online: true });
    });

    var offlineAlert = event => {
      console.log("We are likely offline:", event);
      this.setState({ online: false });
    };

    request.addEventListener("error", offlineAlert);
    request.addEventListener("timeout", offlineAlert);

    request.send(null);
  };

  render() {
    const { online, value } = this.state;
    const numWords = value.split(" ").length;
    return (
      <div className="App">
        <hr className="App-border" />
        {online ? (
          <Fragment>
            {value ? (
              <div className="App-results">
                <h1 className="App-title" style={{ maxWidth: "400px" }}>
                  You wrote <span className="text-green">{numWords} words</span> without
                  distractions.
                </h1>
                <span className="text-secondary" style={{ marginTop: "3em" }}>
                  Export
                </span>
                <div className="App-export-group" style={{ marginTop: "1em" }}>
                  <div className="App-export-item">
                    <button disabled>
                      <i className="fa fa-medium fa-3x" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="App-export-item">
                    <button disabled>
                      <i className="fa fa-twitter fa-3x" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="App-export-item">
                    <button disabled>
                      <i className="fa fa-facebook fa-3x" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="App-export-item">
                    <button>
                      <i className="fa fa-download fa-3x" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <span className="text-secondary" style={{ marginTop: "2em" }}>
                  or
                </span>
                <div style={{ marginTop: "1em" }}>
                  <button onClick={this.onReset} className="App-button">
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="App-landing">
                <h1 className="App-title">
                  The <span className="text-green">Offline</span> Writing App
                </h1>
                <h3 className="App-subtitle text-secondary">
                  Disable distractions and focus on writing
                </h3>
              </div>
            )}
          </Fragment>
        ) : (
          <div className="App-home">
            <div className="App-textarea">
              <textarea
                placeholder="Get started typing..."
                value={value}
                onChange={this.onChange}
              />
            </div>
          </div>
        )}
        <span className="App-footer text-hint">
          {online ? (
            <Fragment>
              {value ? (
                "Turn off your network connection resume writing."
              ) : (
                "Turn off your network connection to get started."
              )}
            </Fragment>
          ) : (
            "Turn on your network connection when finished."
          )}
        </span>
      </div>
    );
  }
}

export default App;
