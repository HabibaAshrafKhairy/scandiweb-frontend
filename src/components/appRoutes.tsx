import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsListPage from "../pages/PLP";
import ProductDetailsPage from "../pages/PDP";
import { GET_CATEGORIES } from "../graphql/queries";
import { DataProps, graphql } from "@apollo/client/react/hoc";
import { Category } from "../types";

interface GraphQLResponse {
  categories: Category[];
}

// Props injected by the graphql HOC
type GraphQLProps = Partial<DataProps<GraphQLResponse>>;

class AppRoutes extends React.Component<GraphQLProps> {
  render(): React.ReactNode {
    const { data } = this.props;
    const defaultCategory = (data?.categories && data.categories[0].name) || "";

    return (
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/products/${defaultCategory}`} />}
        />
        <Route
          path="/products/"
          element={<Navigate to={`/products/${defaultCategory}`} />}
        />
        <Route path="products/:category" element={<ProductsListPage />} />
        <Route
          path="products/:category/:productId"
          element={<ProductDetailsPage />}
        />
      </Routes>
    );
  }
}

export default graphql<GraphQLProps, {}, {}, GraphQLProps>(GET_CATEGORIES)(
  AppRoutes
);
