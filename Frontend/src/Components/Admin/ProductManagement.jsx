import React from "react";
import { Link } from "react-router-dom";

function ProductManagement() {
  const products = [
    {
      id: 12345,
      name: "jacket",
      price: 110,
      sku: "ABI1234",
    },
    {
      id: 1235,
      name: "jacket",
      price: 110,
      sku: "ABCD098",
    },
    {
      id: 123466,
      name: "jacket",
      price: 110,
      sku: "AKJI1234",
    },
  ];

  const handleDelete=(productId)=>{
    if(window.confirm("are you sure you want to delete this product !")){
        console.log("delete product with the id of =>",productId);
    }
  }
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
                    key={product.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.sku}</td>
                    <td className="flex items-center p-4">
                      <Link to={`/admin/products/${product.id}/edit`} className="bg-yellow-500 rounded py-2 px-4 text-white font-semibold">
                        Edit
                      </Link>
                      <button onClick={()=>handleDelete(product.id)} className="bg-red-600 rounded ml-2 py-2 px-4 text-white font-semibold">
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
