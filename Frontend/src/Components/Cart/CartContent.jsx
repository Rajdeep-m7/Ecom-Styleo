import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";

function CartContent() {
    const products = [
        {
            productId : 1 ,
            size:"M",
            name:"t-shirt",
            color:"Red",
            quentity:1,
            price:199,
            image:"https://picsum.photos/200?random=1",
        },
        {
            productId : 2,
            size:"M",
            name:"t-shirt",
            color:"Red",
            quentity:1,
            price:199,
            image:"https://picsum.photos/200?random=2",
        },
        {
            productId : 3,
            size:"M",
            name:"t-shirt",
            color:"Red",
            quentity:1,
            price:199,
            image:"https://picsum.photos/200?random=3",
        },
        {
            productId : 4,
            size:"M",
            name:"t-shirt",
            color:"Red",
            quentity:1,
            price:199,
            image:"https://picsum.photos/200?random=4",
        },
    ]
  return (
    <div>
        {products.map((item , index )=>(
            <div key={index} className='flex gap-2 p-3 mt-2 shadow-md rounded-lg'>
                <img src={item.image} className='h-20 w-20' />
                <div className='flex justify-between w-full'>
                <div className='p-1'>
                    <h1 className='font-semibold text-gray-900'>{item.name}</h1>
                    <p className='text-sm text-gray-800'>size:{item.size} | color:{item.color}</p>
                    <div className='flex gap-2'>
                        <button>-</button>
                        <p>{item.quentity}</p>
                        <button>+</button>
                    </div> 
                </div>
                <div>
                    <p className='text-sm text-gray-800'>${item.price}</p>
                    <MdOutlineDeleteOutline className='h-5 text-red-700 text-right w-full'/>
                </div> 
                </div>
            </div>
        ))}
    </div>
  )
}

export default CartContent