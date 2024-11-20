import React from "react";

class ProductPrice extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <p className="text-lg font-bold pb-2">PRICE:</p>
        <p className="text-2xl font-bold">$50.00</p>
      </div>
    );
  }
}

export default ProductPrice;
