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
    this.thumbnailRefs = props.imageLinks.map(() =>
      React.createRef<HTMLDivElement>()
    );
  }

  thumbnailRefs: React.RefObject<HTMLDivElement>[];

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const { selectedImageIndex } = this.state;
    const { imageLinks } = this.props;

    if (event.key === "ArrowLeft" && selectedImageIndex > 0) {
      this.changeImage(selectedImageIndex - 1);
    }

    if (
      event.key === "ArrowRight" &&
      selectedImageIndex < imageLinks.length - 1
    ) {
      this.changeImage(selectedImageIndex + 1);
    }
  };

  changeImage = (newIndex: number) => {
    this.setState({ selectedImageIndex: newIndex }, () => {
      this.scrollThumbnailIntoView(newIndex);
    });
  };

  scrollThumbnailIntoView = (index: number) => {
    this.thumbnailRefs[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  renderArrowButton = (
    direction: "left" | "right",
    disabled: boolean,
    onClick: () => void
  ) => {
    const isLeftArrow = direction === "left";
    const arrowClass = isLeftArrow ? "" : "rotate-180";
    const disabledClass = disabled ? "bg-[#D3D3D3]" : "";

    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`absolute w-8 h-8 bg-[#000000BA] flex items-center justify-center top-1/2 -translate-y-1/2 ${
          isLeftArrow ? "left-4" : "right-4"
        } cursor-pointer ${arrowClass} rounded-md z-10 ${disabledClass}`}
      >
        <img src={leftArrow} alt={`${direction} arrow`} />
      </button>
    );
  };

  renderThumbnails() {
    const { imageLinks } = this.props;

    return imageLinks.map((link, index) => {
      const isSelected = this.state.selectedImageIndex === index;

      return (
        <div
          key={index}
          ref={this.thumbnailRefs[index]}
          className={`flex-shrink-0 w-20 h-20 cursor-pointer transition-all duration-300 rounded-md ${
            isSelected ? "border-2 border-[#5ECE7B]" : ""
          }`}
          onClick={() => {
            this.setState({ selectedImageIndex: index });
            this.scrollThumbnailIntoView(index);
          }}
        >
          <img
            src={link}
            alt={`Product ${index + 1}`}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      );
    });
  }

  render() {
    const { imageLinks } = this.props;
    const { selectedImageIndex } = this.state;

    if (!imageLinks || imageLinks.length === 0) return null;

    const isFirstImage = selectedImageIndex === 0;
    const isLastImage = selectedImageIndex === imageLinks.length - 1;

    return (
      <div
        className="grid md:grid-cols-[auto,1fr] gap-x-10 gap-y-5"
        data-testid="product-gallery"
        tabIndex={0}
      >
        {/* Thumbnails Gallery */}
        <div className="flex md:flex-col gap-5 md:max-h-[50vh] md:overflow-y-auto overflow-x-auto px-2">
          {this.renderThumbnails()}
        </div>

        {/* Main Image */}
        <div className="w-full md:max-h-[50vh] aspect-square bg-[#fcfbfc] relative transition-all duration-300 rounded-xl mx-auto">
          {/* Left Arrow */}
          {this.renderArrowButton("left", isFirstImage, () =>
            this.changeImage(selectedImageIndex - 1)
          )}

          <img
            src={imageLinks[selectedImageIndex]}
            alt="product image"
            className="w-full h-full object-contain rounded-lg"
          />

          {/* Right Arrow */}
          {this.renderArrowButton("right", isLastImage, () =>
            this.changeImage(selectedImageIndex + 1)
          )}
        </div>
      </div>
    );
  }
}

export default ProductImages;
