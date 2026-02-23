import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../../redux/slices/checkoutSlice";
import axios from "axios";

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {cart , loading , error}=useSelector(
    (state)=> state.cart
  )
  const {user}= useSelector(
    (state)=> state.auth
  )

  const [checkOutId , setCheckOutId]= useState(null)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(()=>{
    if(!cart || !cart.products || cart.products.length === 0){
      navigate("/");
      console.log(cart);
    }
  },[cart , navigate])

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(cart && cart.products.length > 0){
      const res = await dispatch(
        createCheckout({
          checkoutItems : cart.products,
          shippingAddress,
          paymentMethod: "PayPal",
          totalPrice: cart.totalPrice,
        })
      );
      if(res.payload && res.payload._id){
        setCheckOutId(res.payload._id)
      }
    }
  }

  const handlePayment= async(details) =>{
    try {
      console.log(details);
      
      const response =await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkOutId}/pay`,{
        paymentStatus: "paid" , paymentDetails: details
      },
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      )
      await handleFinalizeCHeckout(checkOutId)
    } catch (error) {
      console.error(error);   
    }  
};

const handleFinalizeCHeckout= async(checkoutId)=>{
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,{},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
      }
    )
      navigate("/order-confirm")
  } catch (error) {
    console.error(error);  
  }
}

if(loading)return <p className="text-center">Loading cart..</p>
if(error)return <p className="text-center">Error: {error}</p>
if(!cart || !cart.products || cart.products.length === 0){
  return <p className="text-center">Your cart is empty</p>
}

  return (
    <div className="grid grid-cols-1 justify-around lg:grid-cols-2 gap-8 py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg mb-4 uppercase">Checkout</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <p className="blocl text-gray-700">Email</p>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="block text-gray-700">First Name</p>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <p className="block text-gray-700">last Name</p>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="block text-gray-700">Address </p>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="block text-gray-700">City</p>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <p className="block text-gray-700">Pin Code</p>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="block text-gray-700">Country</p>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <p className="block text-gray-700">Phone Number </p>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mt-6">
              {!checkOutId ? (<button type="submit" className="w-full  bg-black text-white py-3 rounded">Continue to Payment</button> )
              : 
              (<div>
                <p className="text-lg mb-4">Pay with Paypal</p>
                <PaypalButton 
                amount={cart.totalPrice}
                onSuccess={handlePayment}
                onError={(err)=> alert(err.message)}
                />
              </div>)}
          </div>
        </form>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
                {cart.products.map((product , i)=>(
                  <div key={i} className="flex items-start justify-between py-2 border-b">
                    <div className="flex items-start">
                      <img 
                       src={product.image}
                       alt={product.name}
                       className="w-20 h-24 object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-md ">{product.name}</h3>
                        <p className="text-gray-500 "> Size : {product.size}</p>
                        <p className="text-gray-500 "> Color : {product.color}</p>
                      </div>
                    </div>
                    <p className="text-xl">${product.price?.toLocaleString()}</p>
                  </div>
                ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total </p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
