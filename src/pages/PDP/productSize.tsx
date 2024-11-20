import React from "react";

const sizes = ["xs", "s", "m", "l"];

interface State {
  selectedSize: string;
}

class ProductSize extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedSize: sizes[0] };
  }

  render(): React.ReactNode {
    return (
      <div>
        <p className="text-lg font-bold pb-2">SIZE:</p>
        <div className="flex gap-3">
          {sizes.map((size) => {
            const isSelected = this.state.selectedSize === size;
            return (
              <button
                key={size}
                className={`border border-[#1D1F22] w-16 h-11 flex items-center justify-center ${
                  isSelected ? "text-white bg-[#1D1F22]" : "text-[#1D1F22]"
                }`}
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
