import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../../redux/slices/cartSlice";

function CartContent({ cart, userId, guestId }) {
  const dispatch = useDispatch();
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        }),
      );
    }
  };
  const handleRemoveFromCart = (item) => {
    dispatch(
      removeFromCart({
        productId: item.productId,
        guestId,
        userId,
        size: item.size,
        color: item.color,
      }),
    );
  };

  return (
    <div>
      {cart.products.map((item, index) => (
        <div key={index} className="flex gap-2 p-3 mt-2 shadow-md rounded-lg">
          <img src={item.image} className="h-20 w-20" />
          <div className="flex justify-between w-full">
            <div className="p-1">
              <h1 className="font-semibold text-gray-900">{item.name}</h1>
              <p className="text-sm text-gray-800">
                size:{item.size} | color:{item.color}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleAddToCart(
                      item.productId,
                      -1,
                      item.quantity,
                      item.size,
                      item.color,
                    );
                  }}
                  className="text-2xl "
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  className="text-xl"
                  onClick={() => {
                    handleAddToCart(
                      item.productId,
                      1,
                      item.quantity,
                      item.size,
                      item.color,
                    );
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-800">${item.price}</p>
              <MdOutlineDeleteOutline
                onClick={() => {
                  handleRemoveFromCart(item);
                }}
                className="h-5 text-red-700 text-right w-full"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContent;
