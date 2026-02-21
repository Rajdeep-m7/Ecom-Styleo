import React, { useEffect, useState } from "react";
import Hero from "../Components/Layout/Hero";
import GenderCollection from "../Components/Products/GenderCollection";
import NewArrivels from "../Components/Products/NewArrivels";
import BestSeller from "../Components/Products/ProductDetails";
import TopWearsWomen from "../Components/Products/TopWearsWomen";
import FeatureSection from "../Components/Products/FeatureSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../../redux/slices/productSlice";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const { products , loading , error}= useSelector((state)=> state.products);
  const [bestSeller , setBestSeller]= useState(null);

  useEffect(()=>{
    dispatch(
      fetchProductsByFilters({
        gender:"Women",
        category: "Bottom Wear",
        limit:8,
      })
    )
    const fetchBestSeller = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSeller(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchBestSeller();
  },[dispatch])
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivels />
      <div>
        <h1 className="text-3xl font-bold bg-gray-100 text-center p-5 ">Best Seller</h1>
      </div>
      {bestSeller ? (<BestSeller productId={bestSeller._id}/>) : (
        <p className="text-center">loading bestseller products...</p>
      ) }
      
      <TopWearsWomen products={products} loading={loading} error={error} />
      <FeatureSection />
    </div>
  );
}

export default Home;
