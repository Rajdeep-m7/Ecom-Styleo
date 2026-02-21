import React from 'react'
import { Link } from 'react-router-dom';

function TopWearsWomen({products , loading , error}) {
  if(loading){
    return <p className="text-center">loading...</p>
  }
  if(error){
    return <p className="text-center">error:{error}</p>
  }
  
  return (
    <div>
        <div>
            <p className='text-center my-5 text-3xl font-bold'>Top Wears for Women</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-5 items-center p-5 md:p-10 '>
            {products.map((item)=>(
                <Link to={`/product/${item._id}`} key={item._id} className='mx-auto hover:scale-105 transition-transform duration-200'>
                    <img src={item.images[0].url} className='md:w-70 md:h-75 w-80 h-80 rounded-md' />
                    <p className=' font-semibold'>{item.name}</p>
                    <p className='font-semibold'>${item.price}</p>
                </Link>   
            ))}
        </div>
    </div>
  )
}

export default TopWearsWomen