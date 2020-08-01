import React from "react";
import * as actionTypes from "../../../store/actions/actionTypes";
import "./SingleSeasonElement.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
function SingleSeasonElement(props) {
  return (
    <div className="single-season-element">
      <Link
        onClick={() => {
          props.changeUrl(props.location);
        }}
        to={`/watch/${props.id}`}
      >
        <img alt={props.title} src={require("../../../assets/entities/thumbnails/2012.jpg")}></img>
      </Link>
      <div className="details">
        <h3>
          Episode {props.episode}. {props.title}
        </h3>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeUrl: (location) => dispatch({ type: actionTypes.CHANGE_URL, location }),
  };
};
export default connect(null, mapDispatchToProps)(SingleSeasonElement);
