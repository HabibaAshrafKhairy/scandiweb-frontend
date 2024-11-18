import React from "react";
import withRouter, { RouterProps } from "../../utils/withRouter";
import ProductImages from "./productImages";

class ProductDetailsPage extends React.Component<RouterProps> {
  render(): React.ReactNode {
    console.log(this.props.params);
    return (
      <div className="py-20 grid grid-cols-[60%,30%]">
        <ProductImages />
      </div>
    );
  }
}

export default withRouter(ProductDetailsPage);
