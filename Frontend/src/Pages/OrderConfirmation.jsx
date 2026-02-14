import React from "react";

function OrderConfirmation() {
  const checkOut = {
    id: "12323",
    createdAt: new Date(),
    checkoutItems: [
      {
        id: "1",
        name: "Jacket",
        size: "M",
        price: 120,
        quantity: 1,
        color: "Black",
        image: "https://picsum.photos/150?random=1",
      },
      {
        id: "2",
        name: "Sneaker",
        size: "42",
        price: 80,
        quantity: 1,
        color: "white",
        image: "https://picsum.photos/150?random=2",
      },
    ],
    shippingAddress: {
      address: "734004",
      city: "Siliguri",
      country: "India",
    },
  };

  const calculateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7);
    return orderDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-4">
        Thank You for Your Order !
      </h1>

      {checkOut && (
        <div className="p-6 rounded-lg border">
          <div className="flexx justify-between mb-20">
            <div>
              <h2 className="text-xl font-semibold">
                Order ID : {checkOut.id}
              </h2>
              <p>
                Order Date : {new Date(checkOut.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery: {calculateDelivery(checkOut.createdAt)}
              </p>
            </div>
          </div>
          <div className="mb-20 ">
            {checkOut.checkoutItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img
                  src={item.image}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                    <p className="text-md">${item.price}</p>
                    <p className="text-sm text-gray-500">Qty : {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
                <h4 className="text-lg font-semibold mb-2">Payment</h4>
                <p className="text-gray-600">COD</p>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                <p className="text-gray-600">{checkOut.shippingAddress.address}</p>
                <p className="text-gray-600">{checkOut.shippingAddress.city}, {" "}
                    {checkOut.shippingAddress.country}
                </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
