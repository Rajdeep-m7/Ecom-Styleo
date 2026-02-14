import React from 'react'
import Header from '../Common/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Home from '../../Pages/Home'

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default UserLayout