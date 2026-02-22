import React, { useEffect } from 'react'
import MyOrders from './MyOrders'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';

function Profile() {
    const {user } = useSelector(
        (state)=> state.auth
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    },[user , navigate]);

    const handleLogout=()=>{
        dispatch(logout())
        dispatch(clearCart())
        navigate("/login")
    }


  return (
    <div className='min-h-screen m-3 md:m-10' >
        <div className=' flex lg:flex-row flex-col items-center justify-between gap-10'>
            <div className='p-5 md:ml-10  rounded-xl shadow-2xl w-fit'>
                <p className='font-semibold text-xl'>{user?.name}</p>
                <p className='text-sm my-2'>{user?.email}</p>
                <button onClick={handleLogout} className='p-2 px-5 rounded-lg bg-orange-600 text-white font-bold w-full hover:bg-orange-500 cursor-pointer'>Logout</button>
            </div>
            <div className='w-full'>
                <MyOrders/>
            </div>
            
        </div>
    </div>
  )
}

export default Profile