import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import Profile from './Pages/Profile'
import CollectionPage from './Pages/CollectionPage'
import BestSeller from './Components/Products/ProductDetails'
import ScrollToTop from './Components/Common/scrollToTop'
import CheckOut from './Components/Cart/CheckOut'
import OrderConfirmation from './Pages/OrderConfirmation'
import OrderDetails from './Pages/OrderDetails'
import MyOrders from './Pages/MyOrders'
import AdminLayout from './Components/Admin/AdminLayout'
import AdminHomePage from './Pages/AdminHomePage'
import UserManagement from './Components/Admin/UserManagement'
import ProductManagement from './Components/Admin/ProductManagement'
import EditProductPage from './Components/Admin/EditProductPage'
import OrderManagement from './Components/Admin/OrderManagement'

import { Provider } from "react-redux";
import store from '../redux/store'
import ProtectedRoute from './Components/Common/ProtectedRoute'


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/collection' element={<CollectionPage />} />
          <Route path='/product/:id' element={<BestSeller/>} />
          <Route path='/checkout' element={<CheckOut/>} />
          <Route path='order-confirm' element={<OrderConfirmation/>} />
          <Route path='/order/:id' element={<OrderDetails/>} />
          <Route path='/my-orders' element={<MyOrders/>} />
        </Route>
        <Route path='/admin' element={ 
        <ProtectedRoute role="admin">
          <AdminLayout/>
        </ProtectedRoute> } >
          <Route index element={<AdminHomePage/>} />
          <Route path='users' element={<UserManagement />} />
          <Route path='products' element={<ProductManagement/>} />
          <Route path='products/:id/edit' element={<EditProductPage/>} />
          <Route path='orders' element={<OrderManagement/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App