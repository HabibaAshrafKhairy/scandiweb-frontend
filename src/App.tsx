import "./App.css";
import React from "react";
import Header from "./components/header";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsListPage from "./pages/PLP";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="px-20">
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/products/women" />} />
          <Route path="products/:category" element={<ProductsListPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
