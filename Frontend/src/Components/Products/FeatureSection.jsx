import React from 'react'
import featured from "../../assets/assets/featured.webp"
import { IoBagHandle } from "react-icons/io5";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { FaCreditCard } from "react-icons/fa6";

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
        <div className='flex justify-around items-center my-8 sm:flex-row flex-col gap-5'>
            <div className='text-center flex flex-col items-center'>
                <IoBagHandle className='h-6 w-6'/>
                <p className='mt-2'>Free international shipping</p>
                <p className='text-sm text-gray-800'>On order over $100</p>
            </div>
            <div className='text-center flex flex-col items-center'>
                <HiArrowPathRoundedSquare className='h-6 w-6'/>
                <p className='mt-2' >45 days return</p>
                <p className='text-sm text-gray-800'>Money back guarentee</p>
            </div>
            <div className='text-center flex flex-col items-center'>
                <FaCreditCard className='h-6 w-6'/>
                <p className='mt-2'>Secure checkout</p>
                <p className='text-sm text-gray-800'>100% secure checkout process</p>
            </div>
        </div>
    </div>
  )
}

export default FeatureSection