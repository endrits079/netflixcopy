import React from "react";
import PreviewContainer from "../../components/preview-container/PreviewContainer";
import CategoryContainer from "../../components/category-container/CategoryContainer";
export default function Index() {
  return (
    <div className="index">
      <PreviewContainer></PreviewContainer>
      <CategoryContainer></CategoryContainer>
    </div>
  );
}
