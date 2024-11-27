import "./App.css";
import React from "react";
import Header from "./components/header";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsListPage from "./pages/PLP";
import ProductDetailsPage from "./pages/PDP";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="px-4 md:px-28">
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/products/women" />} />
          <Route path="products/:category" element={<ProductsListPage />} />
          <Route
            path="products/:category/:productId"
            element={<ProductDetailsPage />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
