import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import YouMayAlsoLike from "./YouMayAlsoLike";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../../redux/slices/productSlice";
import { addToCart } from "../../../redux/slices/cartSlice";

function BestSeller({ productId }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } =
    useSelector((state) => state.products);

  const { user, guestId } = useSelector((state) => state.auth);

  const productfetchId = productId || id;

  const [image, setImage] = useState(null);
  const [finalSize, setFinalSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [itemColor, setItemColor] = useState("");

  useEffect(() => {
    if (productfetchId) {
      dispatch(fetchProductDetails(productfetchId));
      dispatch(fetchSimilarProducts({ id: productfetchId }));
    }
  }, [dispatch, productfetchId]);
  
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleSubmit = () => {
    if (!finalSize && !itemColor) {
      toast.error("Please select size and color");
      return;
    }

    if (!finalSize) {
      toast.error("Please select a size");
      return;
    }

    if (!itemColor) {
      toast.error("Please select a color");
      return;
    }

    dispatch(
      addToCart({
        productId: productfetchId,
        quantity,
        color: itemColor,
        size: finalSize,
        userId: user?._id,
        guestId,
      })
    ).then(() => {
      toast.success("Added to cart!");
    });
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  if (!selectedProduct) return null;

  return (
    <div className="pb-5 bg-gray-100">
      <div className="flex gap-5 justify-center grow flex-col sm:flex-row p-4 items-center">

        {/* Images */}
        <div className="flex gap-2 justify-center lg:flex-row flex-col-reverse">
          <div className="flex lg:flex-col gap-2">
            {selectedProduct?.images?.map((item, i) => (
              <img
                key={i}
                src={item.url}
                alt="product"
                className={`h-20 w-20 mb-2 rounded cursor-pointer ${
                  image === item.url ? "border-2 scale-105" : ""
                }`}
                onClick={() => setImage(item.url)}
              />
            ))}
          </div>

          <img
            className="rounded-md max-h-80 max-w-70 lg:max-h-100 lg:max-w-100"
            src={image}
            alt="selected"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <p className="text-xl font-bold my-2">{selectedProduct.name}</p>

          {selectedProduct.originalPrice && (
            <p className="line-through text-gray-800">
              ${selectedProduct.originalPrice}
            </p>
          )}

          <p className="font-semibold text-lg mb-2">
            ${selectedProduct.price}
          </p>

          <p className="text-gray-900 font-sm">
            {selectedProduct.description}
          </p>

          {/* Colors */}
          <p className="font-semibold my-2">Colors:</p>
          <div>
            {selectedProduct?.colors?.map((color, i) => (
              <button
                key={i}
                className={`h-6 w-6 rounded-full m-1 border ${
                  itemColor === color ? "border-2 scale-110" : ""
                }`}
                onClick={() => setItemColor(color)}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>

          {/* Sizes */}
          <p className="font-semibold my-2">Sizes:</p>
          <div>
            {selectedProduct?.sizes?.map((size, i) => (
              <button
                key={i}
                className={`p-2 rounded m-1 w-12 text-center ${
                  finalSize === size
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setFinalSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity */}
          <p className="font-semibold my-2">Quantity:</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                quantity > 1 && setQuantity((prev) => prev - 1)
              }
              className="p-1 bg-gray-200"
            >
              -
            </button>

            <p>{quantity}</p>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-1 bg-gray-200"
            >
              +
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full lg:w-1/2 p-2 bg-black text-white font-bold rounded-lg mt-3 hover:scale-105"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* ✅ FIXED: pass similarProducts */}
      <YouMayAlsoLike products={similarProducts} loading={loading} error={error} />
    </div>
  );
}

export default BestSeller;
