import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";

function CheckOut() {
  const cart = {
    products: [
      {
        name: "Jacket",
        size: "M",
        price: 120,
        color:"Black",
        image: "https://picsum.photos/150?random=1",
      },
      {
        name: "Sneaker",
        size: "42",
        price: 80,
        color:"white",
        image: "https://picsum.photos/150?random=2",
      },
    ],
    totalPrice: 200,
  };
  const navigate = useNavigate();
  const [checkOutId , setCheckOutId]= useState(null)
  const [shippinngAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const handleSubmit=(e)=>{
    e.preventDefault();
    setCheckOutId(123);
    navigate("/order-confirm")
  }

  function handlePayment(details) {
  console.log(details);
  console.log(details.id); /*
  console.log(details.payer.email_address);
  console.log(details.purchase_units[0].payments.captures[0].id);*/
  navigate("/order-confirm")
}

  return (
    <div className="grid grid-cols-1 justify-around lg:grid-cols-2 gap-8 py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg mb-4 uppercase">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <p className="blocl text-gray-700">Email</p>
            <input
              type="email"
              value="user@example"
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
                value={shippinngAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippinngAddress,
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
                value={shippinngAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippinngAddress,
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
              value={shippinngAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippinngAddress,
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
                value={shippinngAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippinngAddress,
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
                value={shippinngAddress.pinCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippinngAddress,
                    pinCode: e.target.value,
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
              value={shippinngAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippinngAddress,
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
              value={shippinngAddress.phphone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippinngAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mt-6">
            <button className="w-full bg-black text-bold p-2 text-white rounded" type="submit">Pay COD</button>
              {/*{!checkOutId ? (<button type="submit" className="w-full  bg-black text-white py-3 rounded">Continue to Payment</button> )
              : 
              (<div>
                <p className="text-lg mb-4">Pay with Paypal</p>
                <PaypalButton 
                amount={100}
                onSuccess={handlePayment}
                onError={(err)=> alert(err.message)}
                />
              </div>)}*/}
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
