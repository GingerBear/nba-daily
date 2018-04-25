import React, { Component } from "react";
import "./PageAnchers.css";

class PageAnchers extends Component {
  render() {
    return (
      <ul className="PageAnchers">
        <li>
          {"games" === this.props.currentSection ? (
            <span>Games</span>
          ) : (
            <a href={`#games`}>Games</a>
          )}
        </li>
        <li>
          {"ranking" === this.props.currentSection ? (
            <span>Ranking</span>
          ) : (
            <a href={`#ranking`}>Ranking</a>
          )}
        </li>
      </ul>
    );
  }
}

export default PageAnchers;
