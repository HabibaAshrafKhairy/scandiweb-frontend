import React from "react";
import withRouter, { RouterProps } from "../../utils/withRouter";
import ProductImages from "./productImages";
import ProductSize from "./productSize";

class ProductDetailsPage extends React.Component<RouterProps> {
  render(): React.ReactNode {
    console.log(this.props.params);
    return (
      <div className="py-20 grid grid-cols-[60%,30%]">
        <ProductImages />

        <div className="flex flex-col gap-8 ml-auto">
          <p className="text-3xl font-semibold">Running Shorts</p>

          <ProductSize />
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetailsPage);
