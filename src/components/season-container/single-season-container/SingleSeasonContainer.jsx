import React from "react";
import SingleSeasonElement from "../single-season-element/SingleSeasonElement";
import { Link, withRouter } from "react-router-dom";
function SingleSeasonContainer(props) {
  return (
    <div className="single-category-container">
      <Link to={`/categories/${props.category}`}>
        {" "}
        <h2>Season {props.season}</h2>{" "}
      </Link>
      <div className="movies">
        {props.data.map((season) => {
          let file = season.filePath.split("/")[2];
          return <SingleSeasonElement location={props.history.location.pathname} key={season.id} file={file} {...season}></SingleSeasonElement>;
        })}
      </div>
    </div>
  );
}

export default withRouter(SingleSeasonContainer);
