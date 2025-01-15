import React from "react";
import leftArrow from "../../assets/arrow-left.svg";

interface PropsType {
  imageLinks: string[];
}

interface State {
  selectedImageIndex: number;
}

class ProductImages extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = { selectedImageIndex: 0 };
  }

  render(): React.ReactNode {
    const { imageLinks } = this.props;

    if (!imageLinks || imageLinks.length === 0) return;

    return (
      <div
        className="grid md:grid-cols-[auto,1fr] gap-x-10 gap-y-5"
        data-testid="product-gallery"
      >
        {/* Thumbnails Gallery (On the Left for Larger Screens) */}
        <div className="flex md:flex-col gap-5 md:max-h-[50vh] md:overflow-y-auto overflow-x-auto px-2">
          {imageLinks.map((link, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-20 h-20 cursor-pointer transition-all duration-300 rounded-md ${
                this.state.selectedImageIndex === index
                  ? "border-2 border-[#5ECE7B]"
                  : ""
              }`}
              onClick={() => {
                this.setState({ selectedImageIndex: index });
              }}
            >
              <img
                src={link}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="w-full md:max-h-[50vh] aspect-square bg-[#fcfbfc] relative transition-all duration-300 rounded-xl mx-auto">
          {/* Left Arrow */}
          <div
            onClick={() => {
              this.setState((prev) => {
                if (prev.selectedImageIndex === 0) return;
                return {
                  selectedImageIndex: prev.selectedImageIndex - 1,
                };
              });
            }}
            className="absolute w-8 h-8 bg-[#000000BA] flex items-center justify-center top-1/2 -translate-y-1/2 left-4 cursor-pointer rounded-md z-10"
          >
            <img src={leftArrow} alt="left arrow" />
          </div>

          <img
            src={imageLinks[this.state.selectedImageIndex]}
            alt="product image"
            className="w-full h-full object-contain rounded-lg"
          />

          {/* Right Arrow */}
          <div
            onClick={() => {
              this.setState((prev) => {
                if (prev.selectedImageIndex === imageLinks.length - 1) return;
                return {
                  selectedImageIndex: prev.selectedImageIndex + 1,
                };
              });
            }}
            className="absolute w-8 h-8 bg-[#000000BA] flex items-center justify-center top-1/2 -translate-y-1/2 right-4 cursor-pointer rotate-180 rounded-md z-10"
          >
            <img src={leftArrow} alt="left arrow" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductImages;
