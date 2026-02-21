import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../Components/Layout/FilterSideBar";
import SortOption from "../Components/Layout/SortOption";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../../redux/slices/productSlice";

function CollectionPage() {
  const {collection}= useParams();
  const[searchParams]= useSearchParams();
  const dispatch= useDispatch()
  const{products , loading , error}= useSelector(
    (state)=> state.products
  )
  const queryParams= Object.fromEntries([...searchParams]);

  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection, ...queryParams}))
  },[dispatch , collection, searchParams])

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClick = () => setIsOpen((prev) => !prev);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Lock body scroll only when sidebar open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if(loading){
    return <p className="text-center">loading...</p>
  }
  if(error){
    return <p className="text-center">error:{error}</p>
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      
      <div
        className="md:hidden flex justify-center items-center gap-2 border rounded-lg p-2 mx-5 mt-5 cursor-pointer"
        onClick={handleClick}
      >
        <FaFilter />
        <p className="font-medium">Filters</p>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-45 bg-white z-50 p-4 overflow-y-auto transform transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <FilterSideBar />
      </div>

      <aside className="hidden md:block p-5 w-60 shadow-r-2xl  ">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <FilterSideBar />
        </div>
      </aside>

      <main className="flex-1">
        <h1 className="text-center my-6 text-3xl font-bold">
          All Collection
        </h1>

        <SortOption />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {products.map((item) => (
            <Link to={`/product/${item._id}` }
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={item.images[0].url}
                alt={item.name}
                className="w-full h-72 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}

export default CollectionPage;