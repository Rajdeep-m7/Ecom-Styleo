import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Registration from './Pages/Registration'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App