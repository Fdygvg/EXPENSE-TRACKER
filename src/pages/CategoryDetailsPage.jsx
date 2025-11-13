import React from "react";
import { useParams, Link } from "react-router-dom";

const CategoryDetailsPage = () => {
  const { categoryId } = useParams(); // grabs the category name from URL

  return (
    <section style={{ padding: "20px" }}>
      <Link to="/">⬅ Back</Link>
      <h2>Viewing all expenses for: {categoryId}</h2>
    </section>
  );
};

export default CategoryDetailsPage;
