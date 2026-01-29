import React from 'react'
import Header from '../Common/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Home from '../../Pages/Home'

function UserLayout() {
  return (
    <>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
    </>
  )
}

export default UserLayout