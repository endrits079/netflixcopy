import React from "react";
import "./BackButton.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
function BackButton(props) {
  return (
    <div className="back-button">
      <button
        onClick={() => {
          props.history.push(props.back);
        }}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <h1>{props.children}</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    back: state.location.location,
  };
};
export default connect(mapStateToProps)(withRouter(BackButton));
