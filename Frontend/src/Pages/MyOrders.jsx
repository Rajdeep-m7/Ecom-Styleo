import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "Siliguri", country: "India" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=1",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          id: "12346",
          createdAt: new Date(),
          shippingAddress: { city: "Siliguri", country: "India" },
          orderItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500?random=2",
            },
          ],
          totalPrice: 250,
          isPaid: false,
        },
      ];

      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-4 p-3 md:p-7">
      <p className="text-xl font-semibold mt-5">My Orders</p>

      <div className="overflow-x-auto shadow-2xl rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">Shipping address</th>
              <th className="p-2 text-center">Items</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className=" hover:bg-gray-100">
                  <td className="p-2">
                    <img
                      src={order.orderItems[0]?.image}
                      alt={order.orderItems[0]?.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </td>

                  <td className="p-2 text-blue-500 hover:underline">
                    <Link to={`/order/${order.id}`} className="cursor-pointer">
                      {order.id}
                    </Link>
                  </td>

                  <td className="p-2">
                    {order.createdAt.toLocaleDateString()}
                  </td>

                  <td className="p-2">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </td>

                  <td className="p-2 text-center">{order.orderItems.length}</td>

                  <td className="p-2 text-right">
                    ${order.totalPrice.toFixed(2)}
                  </td>

                  <td className="p-2">
                    <span
                      className={`rounded-full px-2 py-1 text-sm ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;
