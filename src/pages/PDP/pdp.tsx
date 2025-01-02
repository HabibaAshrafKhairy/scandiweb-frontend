import React from "react";
import withRouter, { RouterProps } from "../../utils/withRouter";
import ProductImages from "./productImages";
import ProductTextAttribute from "./productTextAttribute";
import ProductColor from "./productColor";
import ProductPrice from "./productPrice";
import { Product, SelectedAttribute } from "../../types";
import { DataProps, graphql } from "@apollo/client/react/hoc";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { removeTags } from "../../utils/helpers";
import { addToCart } from "../../reducers/cartSlice";
import { connect } from "react-redux";

interface GraphQLResponse {
  product: Product;
}

// Props injected by the graphql HOC
type GraphQLProps = DataProps<GraphQLResponse>;

interface CartProps {
  addToCart: typeof addToCart;
}

// Combined props for the PDP component
type CombinedProps = RouterProps & Partial<GraphQLProps> & Partial<CartProps>;

interface StateType {
  selectedAttributes: SelectedAttribute[] | undefined;
}

class ProductDetailsPage extends React.Component<CombinedProps, StateType> {
  constructor(props: CombinedProps) {
    super(props);

    this.selectAttributeHandler = this.selectAttributeHandler.bind(this);

    this.state = {
      selectedAttributes: [],
    };
  }

  componentDidMount() {
    if (this.props.data?.product?.attributes) {
      const initialState = this.props.data.product.attributes.map((attr) => ({
        attributeSetName: attr.name,
        selectedItemId: attr.items[0]?.id, // Use the first item's value as the default
        selectedItemName: attr.items[0]?.value,
      }));

      this.setState({ selectedAttributes: initialState });
    }
  }

  componentDidUpdate(prevProps: CombinedProps) {
    // Reinitialize if the product changes
    if (prevProps.data?.product?.id !== this.props.data?.product?.id) {
      const initialState = this.props.data?.product?.attributes?.map(
        (attr) => ({
          attributeSetName: attr.name,
          selectedItemId: attr.items[0]?.id,
          selectedItemName: attr.items[0]?.value,
        })
      );
      this.setState({ selectedAttributes: initialState });
    }
  }

  selectAttributeHandler(
    attrSetName: string,
    selectedItemId: number,
    selectedItemName: string
  ) {
    this.setState((prevState) => ({
      selectedAttributes: prevState.selectedAttributes?.map((attr) =>
        attr.attributeSetName === attrSetName
          ? { ...attr, selectedItemId, selectedItemName }
          : attr
      ),
    }));
  }

  render(): React.ReactNode {
    const { data, addToCart } = this.props;

    // Handle loading or error states from GraphQL
    if (!data) return;
    if (data?.loading) return <p>Loading...</p>;
    if (data?.error) return <p>Error: {data.error.message}</p>;

    const product = data?.product;

    if (!product) return;

    console.log("selected attributes", this.state.selectedAttributes);

    return (
      <div className="py-4 md:py-20 flex flex-col gap-8 lg:grid grid-cols-[60%,30%] md:gap-24">
        <ProductImages imageLinks={product?.gallery} />

        <div className="flex flex-col gap-8  max-w-72">
          <p className="text-3xl font-semibold">{product?.name}</p>

          {product?.attributes?.map((attribute) => {
            if (attribute?.type === "swatch")
              return (
                <ProductColor
                  key={attribute?.id}
                  colors={attribute?.items}
                  selectAttributeHandler={this.selectAttributeHandler}
                />
              );
            else
              return (
                <ProductTextAttribute
                  key={attribute?.id}
                  attribute={attribute}
                  selectAttributeHandler={this.selectAttributeHandler}
                />
              );
          })}

          <ProductPrice price={product?.price} />

          <button
            className="p-4 text-base font-semibold text-white bg-[#5ECE7B]"
            data-testid="add-to-cart"
            onClick={() => {
              if (!addToCart) return;
              addToCart({
                ...product,
                selectedAttributes: this.state.selectedAttributes || [],
                amount: 1,
              });
            }}
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

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  null,
  mapDispatchToProps
)(
  withRouter(
    graphql<CombinedProps, {}, {}, CombinedProps>(GET_PRODUCT_BY_ID, {
      options: (props: CombinedProps) => ({
        variables: {
          id: props.params.productId ? props.params.productId : "",
        },
      }),
    })(ProductDetailsPage)
  )
);
