import React from 'react'
import menCollection from "../../assets/assets/mens-collection.webp"
import womenCollection from "../../assets/assets/womens-collection.webp"
import { Link } from 'react-router-dom'

function GenderCollection() {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center lg:gap-30 gap-10 grow py-16 px-4 '>
        <div  className='relative'>
            <img src={menCollection}  className='w-150 h-80 md:h-110 object-cover'/>
            <div className='p-5 bg-white/80 absolute left-2 bottom-3'>
                <p>Men's collection</p>
                <Link>Shop now</Link>
            </div>
        </div>
        <div  className='relative'>
            <img src={womenCollection}  className='w-150 h-80 md:h-110 object-cover'/>
            <div className='p-5 bg-white/80 absolute left-2 bottom-3'>
                <p>Women's collection</p>
                <Link>Shop now</Link>
            </div>
        </div>
    </div>
  )
}

export default GenderCollection