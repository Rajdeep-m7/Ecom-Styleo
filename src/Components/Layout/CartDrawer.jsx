import React, { useState } from 'react'
 import { IoClose } from "react-icons/io5";
import CartContent from '../Common/CartContent';

function CartDrawer({cart , setCart}) {
    
  return (
    <div className={`fixed right-0 top-0 bg-white w-full sm:w-1/2 md:w-120 h-full transform transition-transform shadow-lg flex flex-col z-50 duration-300 ${cart ? "translate-x-0" : "translate-x-full"} `}>

        <div className='flex justify-end p-4'>
            <button onClick={()=> setCart(false)}>
               <IoClose className='h-6 w-6' />
            </button>
        </div>
        <div className='grow overflow-y-auto p-4'>
            <p className='text-xl font-bold'>Your Cart</p>
            {/* cart componenets */}
            <CartContent />
            
        </div>
        <div>
            <button className='w-full mt-2 font-bold text-white bg-black hover:bg-gray-900 py-2 rounded-lg'>CheckOut</button>
            <p className='text-sm text-gray-900 text-center'>Shipping charges , discout code and taxes calculted in checkout</p>
        </div>
    </div>
  )
}

export default CartDrawer