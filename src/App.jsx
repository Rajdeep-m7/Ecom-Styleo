import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App