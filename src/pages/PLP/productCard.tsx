import React from "react";
import productImage from "../../assets/Image.png";
import { Link } from "react-router-dom";
import withRouter, { RouterProps } from "../../utils/withRouter";

class ProductCard extends React.Component<RouterProps> {
  render(): React.ReactNode {
    const pathname = this.props.location.pathname;
    return (
      <Link to={`${pathname}/${Math.random()}`}>
        <div className="p-4 hover:shadow-card transition-shadow duration-300 hover:cursor-pointer">
          <div className="pb-6">
            <img className="w-full" src={productImage} alt="product image" />
          </div>

          <p className="font-light text-lg">Running Shorts</p>
          <p className="text-lg">$50.00</p>
        </div>
      </Link>
    );
  }
}

export default withRouter(ProductCard);
