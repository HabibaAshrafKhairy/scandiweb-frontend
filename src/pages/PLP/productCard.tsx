import React from "react";
import productImage from "../../assets/Image.png";
import addToCart from "../../assets/add-to-cart.svg";
import { Link } from "react-router-dom";
import withRouter, { RouterProps } from "../../utils/withRouter";

interface State {
  isOutOfStock: boolean;
}

class ProductCard extends React.Component<RouterProps, State> {
  constructor(props: RouterProps) {
    super(props);
    this.state = { isOutOfStock: false };
  }

  render(): React.ReactNode {
    const pathname = this.props.location.pathname;

    const cardContent = (
      <div
        data-testid="product-${product name in kebab case}"
        className={`p-4 ${
          !this.state.isOutOfStock &&
          "hover:shadow-card transition-shadow duration-300 hover:cursor-pointer"
        }`}
      >
        <div className="pb-6 relative group">
          <img className="w-full" src={productImage} alt="product image" />
          {this.state.isOutOfStock && (
            <div className="absolute inset-0 bg-white opacity-70 text-[#8D8F9A] text-2xl flex items-center justify-center">
              OUT OF STOCK
            </div>
          )}

          {!this.state.isOutOfStock && (
            <img
              src={addToCart}
              alt="add to cart icon"
              className="absolute right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </div>

        <p className="font-light text-lg">Running Shorts</p>
        <p className={`text-lg ${this.state.isOutOfStock && "text-[#8D8F9A]"}`}>
          $50.00
        </p>
      </div>
    );

    return this.state.isOutOfStock ? (
      <div>{cardContent}</div>
    ) : (
      <Link to={`${pathname}/${Math.random()}`}>{cardContent}</Link>
    );
  }
}

export default withRouter(ProductCard);
