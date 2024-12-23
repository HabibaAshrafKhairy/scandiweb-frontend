import React from "react";

interface PropsType {
  price: number;
}

class ProductPrice extends React.Component<PropsType> {
  render(): React.ReactNode {
    const { price } = this.props;

    if (!price) return;
    return (
      <div>
        <p className="text-lg font-bold pb-2">PRICE:</p>
        <p className="text-2xl font-bold">{`$${price.toFixed(2)}`}</p>
      </div>
    );
  }
}

export default ProductPrice;
