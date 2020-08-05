import React from "react";
import "./CategoryContainer.scss";
import SingleCategoryContainer from "./single-category-container/SingleCategoryContainer";
export default function CategoryContainer({ categories }) {
  return (
    <div className="category-container">
      {categories.length > 0
        ? categories.map((category) => {
            return <SingleCategoryContainer key={category.category} category={category.category} movies={category.data}></SingleCategoryContainer>;
          })
        : null}
    </div>
  );
}
