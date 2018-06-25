import React from "react";
import "./Container.css";

const Container = props => <div className="container" style={{ animation: props.notice === "You guessed incorrectly!" ? "shake 0.5s" : "shake 1s"}}>{props.children}</div>;
// {animation: this.state.notice === "You guessed incorrectly!" ? "shake 0.5s": null}

export default Container;
