import React from "react";
import withRouter, { RouterProps } from "../../utils/withRouter";
import { capitalizeFirstLetter } from "../../utils/helpers";
import ProductsList from "./productsList";

class ProductsListPage extends React.Component<RouterProps> {
  render() {
    const { params } = this.props;

    return (
      <div className="py-20">
        <h1 className="text-[42px] pb-24">
          {capitalizeFirstLetter(params.category)}
        </h1>

        <ProductsList />
      </div>
    );
  }
}

export default withRouter(ProductsListPage);
