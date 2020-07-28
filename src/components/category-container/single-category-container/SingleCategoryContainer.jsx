import React from "react";
import "./SingleCategoryContainer.scss";
import SingleCategoryElement from "../single-category-element/SingleCategoryElement";
import { Link } from "react-router-dom";
export default function SingleCategoryContainer(props) {
  return (
    <div className="single-category-container">
      <Link to={`/categories/${props.category}`}>
        {" "}
        <h2>{props.category}</h2>{" "}
      </Link>
      <div className="movies">
        {props.movies.map((movie) => {
          let img = movie.thumbnail.split("/")[2];
          return (
            <Link to={`/movie/${movie.id}`}>
              <SingleCategoryElement key={movie.id} img={img}></SingleCategoryElement>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
