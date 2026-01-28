import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import SearchBar from './SearchBar';

function Navbar() {
  return (
    <div className='flex justify-between items-center md:px-10 mt-1'>
        <div>
            <Link to="/" className='text-2xl font-bold'>Styleo</Link>
        </div>
        <div className='flex justify-center items-center gap-3'>
            <Link to="#">Men</Link>
            <Link to="#">Women</Link>
            <Link to="#">Top wear</Link>
            <Link to="#">Bottom wear</Link>
            
        </div>
        <div className='flex items-center justify-self-center gap-3 '>
            <Link to="/profile"><AiOutlineUser className='h-6 w-6'/></Link>
            <div className='relative'>
                <Link to="/cart"><IoCartOutline className='h-6 w-6' /></Link>
                <p className='absolute -top-1  right-0 text-white text-xs bg-orange-600 rounded-full px-1'>3</p>
            </div>
            <div className='overflow-hidden'>
                <SearchBar />
            </div>
            <button className='md:hidden'>
                <RiMenu3Fill className='h-6 w-6' />
            </button>
            
        </div>
    </div>
  )
}

export default Navbar