import React from "react";
import "./SingleCategoryContainer.scss";
import SingleCategoryElement from "../single-category-element/SingleCategoryElement";
export default function SingleCategoryContainer(props) {
  return (
    <div className="single-category-container">
      <h2>{props.category}</h2>
      <div className="movies">
        {props.movies.map((movie) => {
          let img = movie.thumbnail.split("/")[2];
          return <SingleCategoryElement key={movie.id} img={img}></SingleCategoryElement>;
        })}
      </div>
    </div>
  );
}
