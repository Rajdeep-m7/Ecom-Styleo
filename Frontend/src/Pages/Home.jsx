import React from "react";
import Hero from "../Components/Layout/Hero";
import GenderCollection from "../Components/Products/GenderCollection";
import NewArrivels from "../Components/Products/NewArrivels";
import BestSeller from "../Components/Products/ProductDetails";
import TopWearsWomen from "../Components/Products/TopWearsWomen";
import FeatureSection from "../Components/Products/FeatureSection";

function Home() {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivels />
      <div>
        <h1 className="text-3xl font-bold bg-gray-100 text-center p-5 ">Best Seller</h1>
      </div>
      <BestSeller />
      <TopWearsWomen />
      <FeatureSection />
    </div>
  );
}

export default Home;
