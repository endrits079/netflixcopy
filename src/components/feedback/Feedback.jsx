import React from "react";
import "./Feedback.scss";
export default function Feedback(props) {
  return <div className={`feedback ${props.succeed ? "success" : "fail"}`}>{props.children}</div>;
}
