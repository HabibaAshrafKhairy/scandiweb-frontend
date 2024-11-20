import React from "react";

const colors = ["#D3D2D5", "#2B2B2B", "#0F6450"];

interface State {
  selectedColor: string;
}

interface PropsType {
  size?: "sm" | "lg";
}

class ProductColor extends React.Component<PropsType, State> {
  static defaultProps: Partial<PropsType> = {
    size: "lg",
  };

  constructor(props: PropsType) {
    super(props);
    this.state = { selectedColor: colors[0] };
  }

  render(): React.ReactNode {
    return (
      <div>
        <p
          className={`text-lg font-bold pb-2 ${
            this.props.size === "sm" && "text-sm font-normal"
          }`}
        >
          COLOR:
        </p>
        <div className="flex gap-3">
          {colors.map((color) => {
            const isSelected = this.state.selectedColor === color;
            return (
              <button
                key={color}
                style={{ backgroundColor: color }}
                className={`w-8 h-8 ${
                  isSelected
                    ? "ring-2 ring-[#5ECE7B] ring-offset-2 ring-offset-white"
                    : ""
                } ${this.props.size === "sm" && "h-5 w-5"}`}
                onClick={() => {
                  this.setState({ selectedColor: color });
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
