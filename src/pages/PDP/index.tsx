import React from "react";
import withRouter, { RouterProps } from "../../utils/withRouter";

class ProductDetailsPage extends React.Component<RouterProps> {
  render(): React.ReactNode {
    console.log(this.props.params);
    return <div className="py-20"></div>;
  }
}

export default withRouter(ProductDetailsPage);
