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
import { addToCart, toggleCartOverlay } from "../../reducers/cartSlice";
import { connect } from "react-redux";
import { toast } from "react-hot-toast";

interface GraphQLResponse {
  product: Product;
}

// Props injected by the graphql HOC
type GraphQLProps = DataProps<GraphQLResponse>;

interface CartProps {
  addToCart: typeof addToCart;
  toggleCartOverlay: typeof toggleCartOverlay;
}

// Combined props for the PDP component
type CombinedProps = RouterProps & Partial<GraphQLProps> & Partial<CartProps>;

type SelectedAttributeMap = Record<
  string,
  { itemId: number; itemName: string } | null | undefined
>;

interface StateType {
  selectedAttributes: SelectedAttributeMap;
}

class ProductDetailsPage extends React.Component<CombinedProps, StateType> {
  constructor(props: CombinedProps) {
    super(props);

    this.selectAttributeHandler = this.selectAttributeHandler.bind(this);

    this.state = {
      selectedAttributes: {},
    };
  }

  selectAttributeHandler(
    attrSetName: string,
    selectedItemId: number,
    selectedItemName: string
  ) {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [attrSetName]: { itemId: selectedItemId, itemName: selectedItemName },
      },
    }));
  }

  addToCartHandler = () => {
    const { data, addToCart, toggleCartOverlay } = this.props;

    const product = data?.product;

    if (!product) return;

    if (!addToCart) return;

    const mappedSelectedAttributes = Object.entries(
      this.state.selectedAttributes
    ).reduce<SelectedAttribute[]>((acc, [currKey, currValue]) => {
      if (currValue) {
        acc.push({
          selectedItemId: currValue.itemId,
          selectedItemName: currValue.itemName,
          attributeSetName: currKey,
        });
      }
      return acc;
    }, []);

    addToCart({
      ...product,
      selectedAttributes: mappedSelectedAttributes,
      amount: 1,
    });

    toast.success("Added item to cart!");
    toggleCartOverlay && toggleCartOverlay();
  };

  render(): React.ReactNode {
    const { data } = this.props;

    // Handle loading or error states from GraphQL
    if (!data) return;
    if (data?.loading) return <p>Loading...</p>;
    if (data?.error) toast.error("Failed to load product details");

    const product = data?.product;

    const productAttributes = product?.attributes;

    const allAttributesSelected = productAttributes?.every((attr) => {
      return !!this.state.selectedAttributes[attr.name];
    });

    if (!product) return;

    return (
      <div className="py-4 md:py-20 flex flex-col gap-8 lg:grid grid-cols-[60%,30%] md:gap-24">
        <ProductImages imageLinks={product?.gallery} />

        <div className="flex flex-col gap-8  max-w-72">
          <p className="text-3xl font-semibold">{product?.name}</p>

          {productAttributes?.map((attribute) => {
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
            className="p-4 text-base font-semibold text-white bg-[#5ECE7B] disabled:bg-slate-400 rounded-lg"
            data-testid="add-to-cart"
            onClick={this.addToCartHandler}
            disabled={!product.in_stock || !allAttributesSelected}
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
  toggleCartOverlay,
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
