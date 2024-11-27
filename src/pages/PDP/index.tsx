import React from "react";
import withRouter, { RouterProps } from "../../utils/withRouter";
import ProductImages from "./productImages";
import ProductSize from "./productSize";
import ProductColor from "./productColor";
import ProductPrice from "./productPrice";

class ProductDetailsPage extends React.Component<RouterProps> {
  render(): React.ReactNode {
    console.log(this.props.params);
    return (
      <div className="py-4 md:py-20 flex flex-col gap-8 lg:grid grid-cols-[60%,30%] md:gap-24">
        <ProductImages />

        <div className="flex flex-col gap-8  max-w-72">
          <p className="text-3xl font-semibold">Running Shorts</p>

          <ProductSize />
          <ProductColor />
          <ProductPrice />

          <button className="p-4 text-base font-semibold text-white bg-[#5ECE7B]">
            ADD TO CART
          </button>

          <p>
            Find stunning women's cocktail dresses and party dresses. Stand out
            in lace and metallic cocktail dresses and party dresses from all
            your favorite brands.
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetailsPage);
