import React from "react";
import "./SingleSeasonElement.scss";
import { Link } from "react-router-dom";
export default function SingleSeasonElement(props) {
  console.log(props);
  return (
    <div className="single-season-element">
      <Link to={`/watch/${props.id}`}>
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
