import React from "react";
import addToCartIcon from "../../assets/add-to-cart.svg";
import { Link } from "react-router-dom";
import withRouter, { RouterProps } from "../../utils/withRouter";
import { Product } from "../../types";
import { connect } from "react-redux";
import { addToCart } from "../../reducers/cartSlice";
import { toKebabCase } from "../../utils/helpers";
import toast from "react-hot-toast";

interface CartProps {
  addToCart: typeof addToCart;
}

type CombinedProps = RouterProps & { product: Product } & CartProps;

class ProductCard extends React.Component<CombinedProps> {
  constructor(props: CombinedProps) {
    super(props);
    this.state = { isOutOfStock: false };
  }

  render(): React.ReactNode {
    const { location, product, addToCart } = this.props;
    const pathname = location.pathname;

    if (!product) return;

    const cardContent = (
      <div
        data-testid={`product-${toKebabCase(product.name)}`}
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
            <button
              onClick={(e) => {
                e.preventDefault();

                addToCart({
                  ...product,
                  amount: 1,
                  selectedAttributes: product.attributes.map((attr) => ({
                    attributeSetName: attr.name,
                    selectedItemId: attr.items[0].id,
                    selectedItemName: attr.items[0].value,
                  })),
                });

                toast.success("Added item to cart");
              }}
            >
              <img
                src={addToCartIcon}
                alt="add to cart icon"
                className="absolute right-4 bottom-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </button>
          )}
        </div>

        <p className="font-light text-lg mt-auto">{product.name}</p>
        <p className={`text-lg ${!product.in_stock && "text-[#8D8F9A]"}`}>
          ${product.price.toFixed(2)}
        </p>
      </div>
    );

    return (
      <Link className="max-w-[360px]" to={`${pathname}/${product.id}`}>
        {cardContent}
      </Link>
    );
  }
}

const mapDispatchToProps = {
  addToCart: addToCart,
};

export default connect(null, mapDispatchToProps)(withRouter(ProductCard));
