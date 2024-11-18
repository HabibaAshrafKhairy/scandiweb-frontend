import React from "react";
import productImage from "../../assets/Image.png";

class ProductCard extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="w-fit p-4 hover:shadow-card transition-shadow duration-300 hover:cursor-pointer">
        <div className="pb-6">
          <img src={productImage} alt="product image" />
        </div>

        <p className="font-light text-lg">Running Shorts</p>
        <p className="text-lg">$50.00</p>
      </div>
    );
  }
}

export default ProductCard;
