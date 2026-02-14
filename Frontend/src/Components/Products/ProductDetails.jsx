import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import YouMayAlsoLike from "./YouMayAlsoLike";

function BestSeller() {
  const products = [
    {
      name: "jacket",
      sizes: ["S", "M", "L", "XL", "XXL"],
      price: 120,
      originalPrice: 150,
      description:
        "Stylish leather jacket crafted for everyday wear. Designed with a comfortable fit, durable material, and a modern look that pairs perfectly with casual or street outfits.",
      meterial: "leather",
      brand: "Fashion Brand",
      colors: ["red", "black"],
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
        },
        {
          url: "https://picsum.photos/500/500?random=2",
        },
      ],
    },
  ];

  const similerproducts = [
    {
      id: 9,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      id: 10,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=2",
    },
    {
      id: 11,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=3",
    },
    {
      id: 12,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=4",
    },
  ];
  const [image, setImage] = useState(products[0].images[0].url);
  const [finalSize, setFinalSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [itemColor, setItemColor] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const handleSize = (size) => {
    setFinalSize(size);
  };

  const handleColor = (color) => {
    setItemColor(color);
  };

  const handleSubmit = () => {
    if (!finalSize && !itemColor) {
      toast.error("Please select size and color");
    } else if (!finalSize) {
      toast.error("Please select a size");
    } else if (!itemColor) {
      toast.error("Please select a color");
    } else {
      toast.success("Added to cart!");
    }
  };
  return (
    <div className="pb-5 bg-gray-100">
      <div>
        <div className="flex gap-5 justify-center grow flex-col sm:flex-row p-4 items-center">
          <div className="flex gap-2 justify-center  lg:flex-row flex-col-reverse ">
            <div className="flex lg:flex-col gap-2">
              {products[0].images.map((item, i) => (
                <img
                  key={i}
                  src={item.url}
                  className={`h-20 w-20 mb-2 rounded ${image == item.url ? "border-2 scale-105" : null} `}
                  onClick={() => setImage(item.url)}
                />
              ))}
            </div>

            <img
              className="rounded-md max-h-80 max-w-70 lg:max-h-100 lg:max-w-100"
              src={image}
            />
          </div>
          <div className="md:w-1/2 ">
            <p className="text-xl font-bold my-2">{products[0].name}</p>
            <p className="line-through text-gray-800">
              ${products[0].originalPrice}
            </p>
            <p className="font-semibold text-lg mb-2">${products[0].price}</p>
            <p className="text-gray-900 font-sm">{products[0].description}</p>
            <div>
              <p className="font-semibold my-2">Colors:</p>
              {products[0].colors.map((color, i) => (
                <button
                  key={i}
                  className={`h-6 w-6 rounded-full m-1 border brightness-50 ${itemColor == color ? "border-3 scale-110" : null}`}
                  onClick={() => handleColor(color)}
                  style={{ backgroundColor: color.toLowerCase() }}
                ></button>
              ))}
            </div>
            <div>
              <p className="font-semibold my-2">Sizes:</p>
              {products[0].sizes.map((size, i) => (
                <button
                  key={i}
                  className={`p-2 rounded m-1 w-12 text-center text-black ${finalSize == size ? "bg-black text-white" : null} `}
                  onClick={() => handleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="font-semibold my-2">quantity:</p>
            <div className="flex items-center gap-2">
              <p
                className="p-1 bg-gray-100 w-fit"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </p>
              <p>{quantity}</p>
              <p
                className="p-1 bg-gray-100 w-fit"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full lg:w-1/2 p-2 bg-black text-white font-bold rounded-lg mt-3 hover:scale-105 cursor-pointer"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <YouMayAlsoLike products={similerproducts} />
    </div>
  );
}

export default BestSeller;
