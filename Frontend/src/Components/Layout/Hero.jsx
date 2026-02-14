import React from 'react'
import heroImg from "../../assets/assets/rabbit-hero.webp";
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='relative'>
        <img src={heroImg} className='w-full  h-130 md:h-140 object-cover'/> 
        <div className='absolute inset-0 bg-black/40 flex gap-5 p-3 flex-col justify-center items-center'>
            <p className='text-5xl md:text-7xl lg:text-8xl text-center font-bold text-white'>Vacation <br/> Ready</p>
            <p className='text-xl text-white text-center '>Explore our vacation ready outfit with worldwide Shipping</p>
            <Link to="/collection" className='bg-white  p-2 rounded-lg px-4'>
            Shop Now
            </Link>
        </div>
    </div>
    
    
  )
}

export default Hero