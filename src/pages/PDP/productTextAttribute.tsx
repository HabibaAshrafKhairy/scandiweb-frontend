import React from "react";
import { Attribute } from "../../types";

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

    return (
      <div data-testid="product-attribute-${attribute in kebab case}">
        <p
          className={`text-lg font-bold pb-2 ${
            this.props.size === "sm" && "text-xs font-normal"
          }`}
        >
          {attribute?.name.toUpperCase()}:
        </p>
        <div className="flex gap-3">
          {attribute?.items?.map((attributeItem) => {
            const isSelected =
              this.state.selectedTextAttributeId === attributeItem.id;
            return (
              <button
                key={attributeItem.id}
                disabled={isCartItem}
                className={`border border-[#1D1F22] w-16 h-11 flex items-center justify-center p-2 ${
                  isSelected ? "text-white bg-[#1D1F22]" : "text-[#1D1F22]"
                } ${this.props.size === "sm" && "w-10 h-8 text-xs"}`}
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
