import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivels from '../Components/Products/NewArrivels'
import BestSeller from '../Components/Products/BestSeller'

function Home() {
  return (
    <div>
        <Hero />
        <GenderCollection />
        <NewArrivels />
        <BestSeller />
    </div>
  )
}

export default Home