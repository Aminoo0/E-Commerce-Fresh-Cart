import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import { ContextContainerProvider } from './context/ContextContainer'
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CurentProducts from './Components/CurentProducts/CurentProducts'
import CategoryProducts from './Components/CategoryProducts/CategoryProducts'
import CategoriesSlider from './Components/CategoriesSlider/CategoriesSlider'
import HomeSlider from './Components/HomeSlider/HomeSlider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Products from './Components/Products/Products'
import { CartContextProvider } from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import SettingUpdatePassword from './Components/SettingUpdatePassword/SettingUpdatePassword'
import SettingUpdateUserData from './Components/SettingUpdateUserData/SettingUpdateUserData'
import WishList from './Components/WishList/WishList'
import SpecificProduct from './Components/SpecificProduct/SpecificProduct'
import Header from './Components/Header/Header'
import Profile from './Components/Profile/Profile'
import BrandProducts from './Components/BrandProducts/BrandProducts'
import PaymentForm from './Components/PaymentForm/PaymentForm'
import AllOrders from './Components/AllOrders/AllOrders'

let router = createHashRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRouter><Home /></ProtectedRouter> },
      { path: 'categories', element: <ProtectedRouter><Categories /> </ProtectedRouter> },
      { path: 'brands', element: <ProtectedRouter><Brands /></ProtectedRouter> },
      { path: 'brandproducts/:brandid', element: <ProtectedRouter><BrandProducts /></ProtectedRouter> },
      { path: 'cart', element: <ProtectedRouter><Cart /></ProtectedRouter> },
      { path: 'productdetails/:id/:category', element: <ProtectedRouter><ProductDetails /></ProtectedRouter> },
      { path: 'curentproducts', element: <ProtectedRouter><CurentProducts /></ProtectedRouter> },
      { path: 'categoryproducts/:id', element: <ProtectedRouter><CategoryProducts /></ProtectedRouter> },
      { path: 'categoriesslider', element: <ProtectedRouter><CategoriesSlider /></ProtectedRouter> },
      { path: 'homeslider', element: <ProtectedRouter><HomeSlider /></ProtectedRouter> },
      { path: 'products', element: <ProtectedRouter><Products /></ProtectedRouter> },
      { path: 'wishlist', element: <ProtectedRouter><WishList /></ProtectedRouter> },
      { path: 'products/specificproduct/:id', element: <ProtectedRouter><SpecificProduct /></ProtectedRouter> },
      { path: '/header', element: <Header /> },
      { path: 'profile', element: <ProtectedRouter><Profile /></ProtectedRouter> },
      { path: 'login', element: <Login /> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'resetcode', element: <ResetCode /> },
      { path: 'changepassword', element: <ChangePassword /> },
      { path: 'paymentform', element: <ProtectedRouter><PaymentForm /></ProtectedRouter> },
      { path: 'E-Commerce-Fresh-Cart/#/allorders', element: <ProtectedRouter><AllOrders /></ProtectedRouter> },
      { path: 'profile/settingupdatepassword', element: <ProtectedRouter><SettingUpdatePassword /></ProtectedRouter> },
      { path: 'profile/settingupdateuserdata', element: <ProtectedRouter><SettingUpdateUserData /></ProtectedRouter> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])

let query = new QueryClient();

function App() {

  return (
    <> <QueryClientProvider client={query}>
      <CartContextProvider>
        <ContextContainerProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </ContextContainerProvider>
      </CartContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
