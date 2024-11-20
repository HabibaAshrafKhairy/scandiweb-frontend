import React from "react";
import ProductCard from "./productCard";

class ProductsList extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(360px,_1fr))] gap-x-10 gap-y-24 w-full">
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
