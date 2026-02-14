import React from 'react'
import MyOrders from './MyOrders'

function Profile() {
  return (
    <div className='min-h-screen m-3 md:m-10' >
        <div className=' flex lg:flex-row flex-col items-center justify-between gap-10'>
            <div className='p-5 md:ml-10  rounded-xl shadow-2xl w-fit'>
                <p className='font-semibold text-xl'>Rajdeep Majumdar</p>
                <p className='text-sm my-2'>amazumder781@gmail.com</p>
                <button className='p-2 px-5 rounded-lg bg-orange-600 text-white font-bold w-full hover:bg-orange-500 cursor-pointer'>Logout</button>
            </div>
            <div className='w-full'>
                <MyOrders/>
            </div>
            
        </div>
    </div>
  )
}

export default Profile