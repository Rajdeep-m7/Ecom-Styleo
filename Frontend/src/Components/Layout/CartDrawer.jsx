import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CartDrawer({ isCart, setCart }) {
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  useEffect(() => {
    const handleBodyScroll = () => {
      if (isCart && window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    handleBodyScroll();

    window.addEventListener("resize", handleBodyScroll);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", handleBodyScroll);
    };
  }, [isCart]);

  const navigate = useNavigate();

  const handleClick = () => {
    setCart(false);
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 bg-white w-full sm:w-1/2 md:w-120 h-full transform transition-transform shadow-lg flex flex-col z-50 duration-300 ${isCart ? "translate-x-0" : "translate-x-full"} `}
    >
      <div className="flex justify-end p-4">
        <button onClick={() => setCart(false)}>
          <IoClose className="h-6 w-6" />
        </button>
      </div>
      <div className="grow overflow-y-auto p-4">
        <p className="text-xl font-bold">Your Cart</p>
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-center">Your cart is empty</p>
        )}
      </div>
      <div>
        {cart && cart?.products?.length > 0 && (
          <div>
            <button
              onClick={handleClick}
              className="w-full mt-2 font-bold text-white bg-black hover:bg-gray-900 py-2 rounded-lg"
            >
              CheckOut
            </button>
            <p className="text-sm text-gray-900 text-center">
              Shipping charges , discout code and taxes calculted in checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
