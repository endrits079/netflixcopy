import React from "react";
import './Input.scss'
export default function Input(props) {
  let element;
  switch (props.type) {
    case "input":
      element = <input {...props.configs}></input>;
      break;
    case "select":
      element = <select {...props.configs}></select>;
      break;
    case "text-area":
      element = <textarea cols="20" rows="40"></textarea>;
      break;
    default:
      element = <input {...props.configs}></input>;
      break;
  }
  return props.label ? (
    <div className="form-group">
      <label>{props.label}</label>
      {element}
    </div>
  ) : (
    <div className="form-group">{element}</div>
  );
}
