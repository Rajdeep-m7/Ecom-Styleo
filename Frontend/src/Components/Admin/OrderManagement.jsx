import React from 'react'

function OrderManagement() {
    const orders=[
        {
            id:12345,
            name:"Rajdeep Majumdar",
            price:110,
            status:"Proccessing"
        }
    ];

    const handleStatusChange=(orderId , status)=>{
        console.log(orderId , status); 
    }
  return (
    <div className=' p-3 md:p-6'>
        <div>
            <h3 className='text-3xl font-bold my-5 mb-6'>Order Management</h3>
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed whitespace-nowrap text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">#{order.id}</td>
                  <td className="p-4">{order.name}</td>
                  <td className="p-4">${order.price}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="p-2 border rounded"
                    >
                      <option value="proccesing">Proccesing</option>
                      <option value="shippined">Shippined</option>
                      <option value="deliverd">Deliverd</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className="bg-green-600 min-w-fit rounded py-2 px-4 text-white font-semibold" onClick={()=>handleStatusChange(order.id, "delivered")}>Mark as Deliverd</button>
                </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default OrderManagement