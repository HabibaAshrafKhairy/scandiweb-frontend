import React from "react";

interface State {
  selectedColor: string;
}

interface PropsType {
  size?: "sm" | "lg";
  isCartItem?: boolean;
  cartItemSelectedColor?: string;
  colors: { id: number; value: string }[];
  selectAttributeHandler?: (attr: string, id: number, name: string) => void;
}

class ProductColor extends React.Component<PropsType, State> {
  static defaultProps: Partial<PropsType> = {
    size: "lg",
  };

  constructor(props: PropsType) {
    super(props);
    this.state = {
      selectedColor: props?.isCartItem
        ? (props?.cartItemSelectedColor as string)
        : props?.colors?.[0].value,
    };
  }

  render(): React.ReactNode {
    const { colors, selectAttributeHandler, isCartItem } = this.props;

    if (!colors || colors?.length === 0) return;

    return (
      <div data-testid="product-attribute-${attribute in kebab case}">
        <p
          className={`text-lg font-bold pb-2 ${
            this.props.size === "sm" && "text-xs font-normal"
          }`}
        >
          COLOR:
        </p>
        <div className="flex gap-2">
          {colors.map((color) => {
            const isSelected = this.state.selectedColor === color.value;
            return (
              <button
                key={color.id}
                disabled={isCartItem}
                style={{ backgroundColor: color.value }}
                className={`w-8 h-8 ${
                  isSelected
                    ? "ring-2 ring-[#5ECE7B] ring-offset-2 ring-offset-white"
                    : "border border-gray-300"
                } ${this.props.size === "sm" && "!h-5 !w-5"}`}
                onClick={() => {
                  this.setState({ selectedColor: color.value });
                  selectAttributeHandler &&
                    selectAttributeHandler("Color", color.id, color.value);
                }}
              ></button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductColor;
