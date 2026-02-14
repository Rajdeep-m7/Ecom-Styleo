import React from 'react'
import { Link } from 'react-router-dom';

function TopWearsWomen() {
    const products = [
    {
      id: 13,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      id: 14,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=2",
    },
    {
      id: 15,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=3",
    },
    {
      id: 16,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=4",
    },
    {
      id: 17,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=5",
    },
    {
      id: 18,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=6",
    },
    {
      id: 19,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=7",
    },
    {
      id: 20,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=8",
    },
  ];
  return (
    <div>
        <div>
            <p className='text-center my-5 text-3xl font-bold'>Top Wears for Women</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-5 items-center p-5 md:p-10 '>
            {products.map((item)=>(
                <Link to={`/product/${item.id}`} key={item.id} className='mx-auto hover:scale-105 transition-transform duration-200'>
                    <img src={item.image} className='md:w-70 md:h-75 w-80 h-80 rounded-md' />
                    <p className=' font-semibold'>{item.name}</p>
                    <p className='font-semibold'>${item.price}</p>
                </Link>   
            ))}
        </div>
    </div>
  )
}

export default TopWearsWomen