import React from "react";
import withRouter, { RouterProps } from "../../utils/withRouter";
import ProductImages from "./productImages";
import ProductTextAttribute from "./productTextAttribute";
import ProductColor from "./productColor";
import ProductPrice from "./productPrice";
import { Product } from "../../types";
import { DataProps, graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { removeTags } from "../../utils/helpers";

interface GraphQLResponse {
  product: Product;
}

// Props injected by the graphql HOC
type GraphQLProps = DataProps<GraphQLResponse>;

// Combined props for the Navigation component
type CombinedProps = RouterProps & Partial<GraphQLProps>;

class ProductDetailsPage extends React.Component<CombinedProps> {
  render(): React.ReactNode {
    const { data } = this.props;

    // Handle loading or error states from GraphQL
    if (!data) return;
    if (data?.loading) return <p>Loading...</p>;
    if (data?.error) return <p>Error: {data.error.message}</p>;

    const product = data?.product;

    if (!product) return;

    console.log(product);

    return (
      <div className="py-4 md:py-20 flex flex-col gap-8 lg:grid grid-cols-[60%,30%] md:gap-24">
        <ProductImages imageLinks={product?.gallery} />

        <div className="flex flex-col gap-8  max-w-72">
          <p className="text-3xl font-semibold">{product?.name}</p>

          {product?.attributes?.map((attribute) => {
            if (attribute?.type === "swatch")
              return (
                <ProductColor key={attribute?.id} colors={attribute?.items} />
              );
            else
              return (
                <ProductTextAttribute
                  key={attribute?.id}
                  attribute={attribute}
                />
              );
          })}

          <ProductPrice price={product?.price} />

          <button
            className="p-4 text-base font-semibold text-white bg-[#5ECE7B]"
            data-testid="add-to-cart"
          >
            ADD TO CART
          </button>

          <p data-testid="product-description">
            {removeTags(product?.description)}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(
  graphql<CombinedProps, {}, {}, CombinedProps>(GET_PRODUCT_BY_ID, {
    options: (props: CombinedProps) => ({
      variables: {
        id: props.params.productId ? props.params.productId : "",
      },
    }),
  })(ProductDetailsPage)
);
