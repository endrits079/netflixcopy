import React, { memo } from "react";
import "./SearchResults.scss";
import { Link } from "react-router-dom";
function SearchResults(props) {
  console.log("Inside sr");
  return (
    <div className="search-results">
      {props.results.length > 0
        ? props.results.map((result) => {
            return (
              <article key={result.id}>
                <Link to={`watch/${result.id}`}>
                  <img alt={`${result.title}${result.episode}${result.season}`} src={require("../../assets/entities/thumbnails/2012.jpg")}></img>
                </Link>
                <h4>{result.title}</h4>
                <h5>
                  Season:{result.season} Episode:{result.episode}{" "}
                </h5>
              </article>
            );
          })
        : null}
    </div>
  );
}

export default memo(SearchResults);
