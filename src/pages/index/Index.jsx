import React from "react";
import PreviewContainer from "../../components/preview-container/PreviewContainer";
import CategoryContainer from "../../components/category-container/CategoryContainer";
export default function Index() {
  let formData = new FormData();
  formData.append("getPreview", true);
  return (
    <div className="index">
      <PreviewContainer formData={formData}></PreviewContainer>
      <CategoryContainer></CategoryContainer>
    </div>
  );
}
