import React, { useState, useEffect } from "react";
import PreviewContainer from "../../components/preview-container/PreviewContainer";
import CategoryContainer from "../../components/category-container/CategoryContainer";
import axios from "axios";
export default function Index() {
  console.log("Inside Index");
  let formData = new FormData();
  formData.append("getPreview", true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let formData = new FormData();
    formData.append("getCategories", true);
    axios.post("http://localhost/netflix/index.php", formData).then((response) => {
      setCategories(response.data);
    });
  }, []);
  return (
    <div className="index">
      <PreviewContainer formData={formData}></PreviewContainer>
      <CategoryContainer categories={categories}></CategoryContainer>
    </div>
  );
}
