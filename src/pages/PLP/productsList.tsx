import React from "react";
import ProductCard from "./productCard";
import { Product } from "../../types";

interface PropsType {
  products: Product[];
}

class ProductsList extends React.Component<PropsType> {
  render(): React.ReactNode {
    const { products } = this.props;

    return (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_auto))] gap-x-4 md:gap-x-10 gap-y-4 md:gap-y-24 w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductsList;
