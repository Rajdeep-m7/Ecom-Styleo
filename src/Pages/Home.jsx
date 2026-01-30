import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivels from '../Components/Products/NewArrivels'
import BestSeller from '../Components/Products/BestSeller'
import YouMayAlsoLike from '../Components/Products/YouMayAlsoLike'

function Home() {
  return (
    <div>
        <Hero />
        <GenderCollection />
        <NewArrivels />
        <BestSeller />
        <YouMayAlsoLike/>
    </div>
  )
}

export default Home