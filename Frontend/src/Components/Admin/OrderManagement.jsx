import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../../../redux/slices/adminOrderSlice';

function OrderManagement() {
    const dispatch= useDispatch();
    const navigate = useNavigate()
    const { user }= useSelector(
      (state)=> state.auth
    )
    const { orders , loading , error}= useSelector(
      (state)=> state.adminOrder
    );
    useEffect(()=>{
      if( user && user.role !=="admin"){
        navigate("/")
      }else{
        dispatch(fetchAllOrders())
      }
    },[dispatch,user, navigate])

    console.log(orders);
    
    const handleStatusChange=(orderId , status)=>{
      dispatch(updateOrderStatus({id: orderId , status}))
    }

    if(loading)return <p className="text-center mt-5">Loading...</p>
    if(error)return <p className="text-center mt-5">Error: {error}</p>
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
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">#{order._id}</td>
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">${order.totalPrice}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="p-2 border rounded"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className="bg-green-600 min-w-fit rounded py-2 px-4 text-white font-semibold" onClick={()=>handleStatusChange(order._id, "Delivered")}>Mark as Deliverd</button>
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