import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivels from '../Components/Products/NewArrivels'

function Home() {
  return (
    <div>
        <Hero />
        <GenderCollection />
        <NewArrivels />
    </div>
  )
}

export default Home