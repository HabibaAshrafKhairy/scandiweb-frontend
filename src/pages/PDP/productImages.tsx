import React from "react";

// Array of working product image links
const imageLinks = [
  "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // T-shirt
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Jacket
  "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // T-shirt
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Jacket
  "https://images.unsplash.com/photo-1519638399535-1b036603ac77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Sneakers
];

interface State {
  selectedImageIndex: number;
}

class ProductImages extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedImageIndex: 0 };
  }

  render(): React.ReactNode {
    return (
      <div className="grid grid-cols-[auto,1fr] gap-x-10">
        <div className="flex flex-col gap-5 bg-yellow-200">
          {imageLinks.map((link, index) => (
            <div
              key={index}
              className="w-20 h-20 cursor-pointer"
              onClick={() => {
                this.setState({ selectedImageIndex: index });
              }}
            >
              <img
                src={link}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="w-full h-full bg-red-300">
          <img
            src={imageLinks[this.state.selectedImageIndex]}
            alt="product image"
            className="object-contain"
          />
        </div>
      </div>
    );
  }
}

export default ProductImages;
