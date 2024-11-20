import React from "react";

const sizes = ["xs", "s", "m", "l"];

interface State {
  selectedSize: string;
}

interface PropsType {
  size?: "sm" | "lg";
}

class ProductSize extends React.Component<PropsType, State> {
  static defaultProps: Partial<PropsType> = {
    size: "lg",
  };

  constructor(props: PropsType) {
    super(props);
    this.state = { selectedSize: sizes[0] };
  }

  render(): React.ReactNode {
    return (
      <div>
        <p
          className={`text-lg font-bold pb-2 ${
            this.props.size === "sm" && "text-sm font-normal"
          }`}
        >
          SIZE:
        </p>
        <div className="flex gap-3">
          {sizes.map((size) => {
            const isSelected = this.state.selectedSize === size;
            return (
              <button
                key={size}
                className={`border border-[#1D1F22] w-16 h-11 flex items-center justify-center ${
                  isSelected ? "text-white bg-[#1D1F22]" : "text-[#1D1F22]"
                } ${this.props.size === "sm" && "h-6 w-6 text-sm"}`}
                onClick={() => {
                  this.setState({ selectedSize: size });
                }}
              >
                {size.toLocaleUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductSize;
