import React from "react";

interface State {
  selectedColor: string;
}

interface PropsType {
  size?: "sm" | "lg";
  colors: { id: number; value: string }[];
}

class ProductColor extends React.Component<PropsType, State> {
  static defaultProps: Partial<PropsType> = {
    size: "lg",
  };

  constructor(props: PropsType) {
    super(props);
    this.state = { selectedColor: props?.colors?.[0].value };
  }

  render(): React.ReactNode {
    const { colors } = this.props;

    if (!colors || colors?.length === 0) return;

    return (
      <div data-testid="product-attribute-${attribute in kebab case}">
        <p
          className={`text-lg font-bold pb-2 ${
            this.props.size === "sm" && "text-sm font-normal"
          }`}
        >
          COLOR:
        </p>
        <div className="flex gap-3">
          {colors.map((color) => {
            const isSelected = this.state.selectedColor === color.value;
            return (
              <button
                key={color.id}
                style={{ backgroundColor: color.value }}
                className={`w-8 h-8 ${
                  isSelected
                    ? "ring-2 ring-[#5ECE7B] ring-offset-2 ring-offset-white"
                    : ""
                } ${this.props.size === "sm" && "h-5 w-5"}`}
                onClick={() => {
                  this.setState({ selectedColor: color.value });
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
