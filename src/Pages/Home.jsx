import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivels from '../Components/Products/NewArrivels'
import BestSeller from '../Components/Products/BestSeller'
import YouMayAlsoLike from '../Components/Products/YouMayAlsoLike'
import TopWearsWomen from '../Components/Products/TopWearsWomen'
import FeatureSection from '../Components/Products/FeatureSection'

function Home() {
  return (
    <div>
        <Hero />
        <GenderCollection />
        <NewArrivels />
        <BestSeller />
        <YouMayAlsoLike/>
        <TopWearsWomen/>
        <FeatureSection />
    </div>
  )
}

export default Home