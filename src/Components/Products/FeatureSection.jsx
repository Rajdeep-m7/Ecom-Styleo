import React from 'react'
import featured from "../../assets/assets/featured.webp"

function FeatureSection() {

  return (
    <div >
        <div className='bg-green-100 m-5 lg:mx-20 flex md:flex-row flex-col-reverse gap-3 justify-between items-center rounded-xl overflow-hidden'>
            <div className='p-5'>
                <p className='font-bold'>Comfort and Style</p>
                <p className='text-3xl font-bold my-3'>Apparel made for your everyday life</p>
                <p className='text-sm md:max-w-2xl'>Discover high-quality , comfortable clothing that effotlessly blends fashion and function , Designed to make you look and feel great every day </p>
                <button className='my-3 bg-black text-white px-5 p-2 rounded-xl'>Shop now</button>
            </div>
            <div>
                <img src={featured} className=' w-full md:max-w-150 md:max-h-135 p-0'  />
            </div>
        </div>
    </div>
  )
}

export default FeatureSection