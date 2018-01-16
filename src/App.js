import React, { Component } from "react";
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
        <div className="App-content">
          {!online && (
            <div className="App-textarea">
              <textarea
                placeholder="Get started typing..."
                value={value}
                onChange={this.onChange}
              />
            </div>
          )}
          {online && (
            <React.Fragment>
              {value ? (
                <React.Fragment>
                  <h1 className="App-title App-title--results">
                    You wrote <span className="text-green">{numWords} words</span> without
                    distractions.
                  </h1>
                  <div className="App-button-group">
                    <button onClick={this.onReset} className="App-button App-button-dark">
                      Download
                    </button>
                    <button onClick={this.onReset} className="App-button">
                      Start Over
                    </button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h1 className="App-title">
                    The <span className="text-green">Offline</span> Writing App
                  </h1>
                  <h3 className="App-subtitle text-secondary">
                    Disable distractions and focus on writing
                  </h3>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
        <div className="App-footer">
          <span className="text-hint">
            {online ? (
              <React.Fragment>
                {value ? (
                  "Turn off your network connection resume writing."
                ) : (
                  "Turn off your network connection to get started."
                )}
              </React.Fragment>
            ) : (
              "Turn back on your network connection when finished."
            )}
          </span>
        </div>
      </div>
    );
  }
}

export default App;
