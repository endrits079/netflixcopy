import React, { useState, useEffect } from "react";
import "./CategoryContainer.scss";
import axios from "axios";
import SingleCategoryContainer from "./single-category-container/SingleCategoryContainer";
export default function CategoryContainer() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let formData = new FormData();
    formData.append("getCategories", true);
    axios.post("http://localhost/netflix/index.php", formData).then((response) => {
      console.log(response.data);
      setCategories(response.data);
    });
  }, []);
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
