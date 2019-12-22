import React from "react";
import { Link } from "react-router-dom";

const About = () => (
  <div className="app dark-gray courier pv5 ph4 relative">
    <div className="tl mw6 mv5">
      <h3 className="f3 fw1 ma0">The Offline Writing App</h3>
      <hr />
      <p className="lh-copy">
        The internet is full of distrations. Serious writers shouldn't be
        distracted by the endless buffet of cat memes.{" "}
        <strong>The Offline Writing App</strong> is the only writing app that
        makes you disconnect so you can get some focus.
      </p>
      <p className="b">How to Use It</p>
      <p className="lh-copy">
        To use it, simply disconnect from the internet. Turn your Wi-Fi off,
        turn on your airplane mode, disconnect your internet tubes, etc. When
        you are done, turn your Wi-Fi back on and copy-and-paste your content to
        your heart's delight.
      </p>
      <p className="b">Credits</p>
      <p className="lh-copy">
        This lovely app was made by{" "}
        <a
          className="link underline-hover dark-green b"
          href="https://twitter.com/nikolazaris"
          target="_blank"
          rel="noopener noreferrer"
        >
          Niko Lazaris
        </a>
        . If you enjoy the app, I would love to hear it. Feel free to reach out.
      </p>
    </div>
    <div className="absolute ml4 mt4" style={{ left: 0, top: 0 }}>
      <Link
        className="link moon-gray hover-mid-gray f5 fw1 flex items-center"
        to="/"
      >
        <div
          className="ba bw1 br-100 f4 flex items-center justify-center mr2"
          style={{ width: "24px", height: "24px", lineHeight: "24px" }}
        >
          {"<"}
        </div>
        Back
      </Link>
    </div>
  </div>
);

export default About;
