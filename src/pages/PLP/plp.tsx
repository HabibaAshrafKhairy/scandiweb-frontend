import React from "react";
import withRouter, { RouterProps } from "../../utils/withRouter";
import { capitalizeFirstLetter } from "../../utils/helpers";
import ProductsList from "./productsList";
import { Product } from "../../types";
import { DataProps, graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCTS } from "../../graphql/queries";
import toast from "react-hot-toast";

interface GraphQLResponse {
  products: Product[];
}

// Props injected by the graphql HOC
type GraphQLProps = DataProps<GraphQLResponse>;

// Combined props for the Navigation component
type CombinedProps = RouterProps & Partial<GraphQLProps>;

class ProductsListPage extends React.Component<CombinedProps> {
  componentDidUpdate(prevProps: CombinedProps) {
    // If the category has changed, refetch data with the new category
    if (
      prevProps.params.category !== this.props.params.category &&
      this.props.params.category !== "all"
    ) {
      this.props.data?.refetch({ categoryName: this.props.params.category });
    }
  }

  render() {
    const { params, data } = this.props;

    // Handle loading or error states from GraphQL
    if (!data) return;
    if (data?.loading) return <p>Loading...</p>;
    if (data?.error) toast.error("Failed to load products");

    const products = data?.products || []; // Default to empty array if no products

    return (
      <div className="py-4 md:py-20">
        <h1 className="text-base md:text-[42px] pb-4 md:pb-24">
          {capitalizeFirstLetter(params.category)}
        </h1>

        <ProductsList products={products} />
      </div>
    );
  }
}

export default withRouter(
  graphql<CombinedProps, {}, {}, CombinedProps>(GET_PRODUCTS, {
    options: (props: CombinedProps) => ({
      variables: {
        categoryName:
          props.params.category !== "all" ? props.params.category : "",
      },
    }),
  })(ProductsListPage)
);
