import React from "react";

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
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center p-5">Best Seller</h1>
      </div>
      <div >
        <div className="flex gap-5 justify-center grow flex-col sm:flex-row p-4 items-center" >

          <div className="flex gap-2 justify-center  md:flex-row flex-col-reverse ">
            <div className="flex md:flex-col gap-2">
              {products[0].images.map((item, i) => (
                <img
                  key={i}
                  src={item.url}
                  className="h-20 w-20 mb-2 rounded"
                />
              ))}
            </div>

            <img
              className="rounded-md max-h-70 max-w-70 lg:max-h-100 lg:max-w-100"
              src={products[0].images[0].url}
            />
          </div>
          <div className="md:w-1/2 ">
            <p className="text-xl font-bold">{products[0].name}</p>
            <p className="line-through text-gray-800">${products[0].originalPrice}</p>
            <p className="font-semibold text-lg">${products[0].price}</p>
            <p className="text-gray-900 font-sm">{products[0].description}</p>
            <div>
              <p className="font-semibold">Colors:</p>
              {products[0].colors.map((color, i) => (
                <button
                  className="h-6 w-6 rounded-full m-1 border brightness-50"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></button>
              ))}
            </div>
            <div>
              <p className="font-semibold">Sizes:</p>
              {products[0].sizes.map((size, i) => (
                <button
                  key={i}
                  className="p-2 bg-gray-100 m-1 w-12 text-center text-black"
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="font-semibold">quantity:</p>
            <div className="flex gap-2">
              <p className="p-1 bg-gray-100 w-fit">-</p>
              <p>1</p>
              <p className="p-1 bg-gray-100 w-fit">+</p>
            </div>
            <button className="w-full lg:w-1/2 p-2 bg-black text-white font-bold rounded-lg mt-3">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
