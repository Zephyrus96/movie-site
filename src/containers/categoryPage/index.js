import React from "react";
import Category from "../../components/category/index";
import { MovieProvider } from "../../context/MovieContext";

const CategoryPage = () => {
  return (
    <MovieProvider>
      <Category />
    </MovieProvider>
  );
};
export default CategoryPage;
