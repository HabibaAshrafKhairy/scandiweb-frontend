import React from "react";
import ProductCard from "./productCard";

class ProductsList extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="grid grid-cols-3 gap-x-10 gap-y-24">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    );
  }
}

export default ProductsList;
