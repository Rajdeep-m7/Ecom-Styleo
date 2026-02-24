import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../../redux/slices/adminProductSlice";

function ProductManagement() {
  const dispatch = useDispatch();
  const {products , loading, error}= useSelector(
    (state)=> state.adminProduct
  )

  useEffect(()=>{
    dispatch(fetchAdminProducts())
  }, [dispatch])

  const handleDelete=(productId)=>{
    if(window.confirm("are you sure you want to delete this product !")){
        dispatch(deleteProduct(productId))
    }
  }

  if(loading)return <p className="text-center mt-5">Loading...</p>
  if(error)return <p className="text-center mt-5">Error: {error}</p>

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4 w-1/4">Name</th>
                <th className="py-3 px-4 w-1/6">Price</th>
                <th className="py-3 px-4 w-1/6">Sku</th>
                <th className="py-3 px-4 w-1/4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.sku}</td>
                    <td className="flex items-center p-4">
                      <Link to={`/admin/products/${product._id}/edit`} className="bg-yellow-500 rounded py-2 px-4 text-white font-semibold">
                        Edit
                      </Link>
                      <button onClick={()=>handleDelete(product._id)} className="bg-red-600 rounded ml-2 py-2 px-4 text-white font-semibold">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No recent products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
