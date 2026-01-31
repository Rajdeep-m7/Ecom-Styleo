import React from 'react'

function TopWearsWomen() {
    const products = [
    {
      id: 1,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      id: 2,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=2",
    },
    {
      id: 3,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=3",
    },
    {
      id: 4,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=4",
    },
    {
      id: 5,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=5",
    },
    {
      id: 6,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=6",
    },
    {
      id: 7,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=7",
    },
    {
      id: 8,
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
                <div key={item.id} className='mx-auto hover:scale-105 transition-transform duration-200'>
                    <img src={item.image} className='md:w-70 md:h-75 w-80 h-80 rounded-md' />
                    <p className=' font-semibold'>{item.name}</p>
                    <p className='font-semibold'>${item.price}</p>
                </div>   
            ))}
        </div>
    </div>
  )
}

export default TopWearsWomen