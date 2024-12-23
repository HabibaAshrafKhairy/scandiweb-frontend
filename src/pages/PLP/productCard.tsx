import React from "react";
import addToCart from "../../assets/add-to-cart.svg";
import { Link } from "react-router-dom";
import withRouter, { RouterProps } from "../../utils/withRouter";
import { Product } from "../../types";

type CombinedProps = RouterProps & { product: Product };

class ProductCard extends React.Component<CombinedProps> {
  constructor(props: CombinedProps) {
    super(props);
    this.state = { isOutOfStock: false };
  }

  render(): React.ReactNode {
    const { location, product } = this.props;
    const pathname = location.pathname;

    if (!product) return;

    const cardContent = (
      <div
        data-testid="product-${product name in kebab case}"
        className={`p-4 w-full h-full flex flex-col !max-w-96 relative ${
          product.in_stock &&
          "hover:shadow-card transition-shadow duration-300 hover:cursor-pointer"
        }`}
      >
        <div className="pb-6 group">
          <img
            className="w-full"
            src={`${product.gallery.length > 0 && product.gallery[0]}`}
            alt="product image"
          />
          {!product.in_stock && (
            <div className="absolute inset-0 bg-white opacity-70 text-[#8D8F9A] text-2xl flex items-center justify-center">
              OUT OF STOCK
            </div>
          )}

          {product.in_stock && (
            <img
              src={addToCart}
              alt="add to cart icon"
              className="absolute right-4 bottom-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </div>

        <p className="font-light text-lg mt-auto">{product.name}</p>
        <p className={`text-lg ${!product.in_stock && "text-[#8D8F9A]"}`}>
          ${product.price.toFixed(2)}
        </p>
      </div>
    );

    return !product.in_stock ? (
      <div className="max-w-[360px]">{cardContent}</div>
    ) : (
      <Link className="max-w-[360px]" to={`${pathname}/${product.id}`}>
        {cardContent}
      </Link>
    );
  }
}

export default withRouter(ProductCard);
