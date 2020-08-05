import React, { useEffect, useState } from "react";
import "./Movies.scss";
import axios from "axios";
import CategoryContainers from "../../components/category-container/CategoryContainer";
export default function TVShows() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let formData = new FormData();
    formData.append("getMovies", true);
    axios.post("http://localhost/netflix/getByIsMovie.php", formData).then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <div className='movies-category'>
      <CategoryContainers categories={categories}></CategoryContainers>
    </div>
  );
}
