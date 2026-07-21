import React from 'react'
import { Outlet } from 'react-router-dom'
import GlobalStyles from '../components/globalStyles'
import Header from '../components/header'
import Footer from '../components/footer'

const Template = () => {
  return <>
    <GlobalStyles />
    <Header />
        <Outlet />
    <Footer />
  </>
}

export default Template