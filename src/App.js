import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = { online: false, value: localStorage.getItem("value") };

  componentWillMount() {
    this.tryRequest();
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({ value });
    localStorage.setItem("value", value);
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
    return (
      <div className="App">
        {online ? (
          <div>
            <h1>The offline-only writing app</h1>
            <p>Looks like you are online. Please disable your network connection to use the app.</p>
          </div>
        ) : (
          <textarea
            style={{ width: "400px", marginTop: "50px" }}
            placeholder="Get started typing..."
            value={value}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}

export default App;
