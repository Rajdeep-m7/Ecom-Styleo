import React from 'react'
import TopBar from '../Layout/TopBar'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify'

function Header() {
  return (
    <div>
        <TopBar />
        <Navbar />
        <ToastContainer/>
    </div>
  )
}

export default Header