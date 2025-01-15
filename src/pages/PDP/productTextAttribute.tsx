import React from "react";
import { Attribute } from "../../types";
import { toKebabCase } from "../../utils/helpers";

interface State {
  selectedTextAttributeId: number;
}

interface PropsType {
  size?: "sm" | "lg";
  isCartItem?: boolean;
  cartItemSelectedAttributeId?: number;
  attribute: Attribute;
  selectAttributeHandler?: (attr: string, id: number, name: string) => void;
}

class ProductTextAttribute extends React.Component<PropsType, State> {
  static defaultProps: Partial<PropsType> = {
    size: "lg",
  };

  constructor(props: PropsType) {
    super(props);
    this.state = {
      selectedTextAttributeId: props?.isCartItem
        ? (props?.cartItemSelectedAttributeId as number)
        : props?.attribute?.items[0].id,
    };
  }

  render(): React.ReactNode {
    const { attribute, selectAttributeHandler, isCartItem } = this.props;

    if (!attribute) return;

    const attrNameInKebabCase = toKebabCase(attribute?.name);

    return (
      <div
        data-testid={
          isCartItem
            ? `cart-item-attribute-${attrNameInKebabCase}`
            : `product-attribute-${attrNameInKebabCase}`
        }
      >
        <p
          className={`text-lg font-bold pb-2 ${
            this.props.size === "sm" && "text-sm font-normal pb-1"
          }`}
        >
          {attribute?.name.toUpperCase()}:
        </p>
        <div className="flex flex-wrap gap-2">
          {attribute?.items?.map((attributeItem) => {
            const isSelected =
              this.state.selectedTextAttributeId === attributeItem.id;
            return (
              <button
                data-testid={`${
                  isSelected
                    ? `cart-item-attribute-${attrNameInKebabCase}-${attrNameInKebabCase}-selected`
                    : `cart-item-attribute-${attrNameInKebabCase}-${attrNameInKebabCase}`
                }`}
                key={attributeItem.id}
                disabled={isCartItem}
                className={`border border-[#1D1F22] text-xs w-10 h-8 flex items-center justify-center p-2 ${
                  isSelected ? "text-white bg-[#1D1F22]" : "text-[#1D1F22]"
                }`}
                onClick={() => {
                  this.setState({
                    selectedTextAttributeId: attributeItem.id,
                  });
                  selectAttributeHandler &&
                    selectAttributeHandler(
                      attribute?.name,
                      attributeItem.id,
                      attributeItem.value
                    );
                }}
              >
                {attributeItem.value}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductTextAttribute;
