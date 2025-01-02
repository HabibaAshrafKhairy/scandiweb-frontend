import React from "react";
import { Attribute } from "../../types";

interface State {
  selectedTextAttributeValue: string;
}

interface PropsType {
  size?: "sm" | "lg";
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
      selectedTextAttributeValue: props?.attribute?.items[0].value,
    };
  }

  render(): React.ReactNode {
    const { attribute, selectAttributeHandler } = this.props;

    if (!attribute) return;

    return (
      <div data-testid="product-attribute-${attribute in kebab case}">
        <p
          className={`text-lg font-bold pb-2 ${
            this.props.size === "sm" && "text-sm font-normal"
          }`}
        >
          {attribute?.name.toUpperCase()}:
        </p>
        <div className="flex gap-3">
          {attribute?.items?.map((attributeItem) => {
            const isSelected =
              this.state.selectedTextAttributeValue === attributeItem.value;
            return (
              <button
                key={attributeItem.id}
                className={`border border-[#1D1F22] w-16 h-11 flex items-center justify-center ${
                  isSelected ? "text-white bg-[#1D1F22]" : "text-[#1D1F22]"
                } ${this.props.size === "sm" && "h-6 w-6 text-sm"}`}
                onClick={() => {
                  this.setState({
                    selectedTextAttributeValue: attributeItem.value,
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
