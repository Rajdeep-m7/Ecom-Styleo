import React from "react";
import { Link } from "react-router-dom";

function YouMayAlsoLike({ products = [] , loading , error}) {
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }
  
  if (!products.length) return null;

  return (
    <div className="mt-12 px-4">
      
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-10 capitalize">
        You May Also Like
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:px-30 md:grid-cols-4  gap-8">
        
        {products.map((item) => (
          <Link
            to={`/product/${item._id}`}
            key={item._id}
            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
          >
            
            {/* Image */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={item?.images?.[0]?.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="font-semibold text-gray-800 truncate">
                {item.name}
              </p>
              <p className="text-black font-bold mt-1">
                ${item.price}
              </p>
            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}

export default YouMayAlsoLike;
