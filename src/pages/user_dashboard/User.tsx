import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/userComponents/sidebar/sidebar'
import Home from '../../components/userComponents/home/home'
import About from '../../components/userComponents/about/about'
import Profile from '../../components/userComponents/profile/profile'
import UpdateProfile from '../../components/userComponents/profile/updateProfile'

const UserLayout: React.FC = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}
    >
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div
          style={{
            flex: 1,
            maxHeight: '85vh',
            paddingLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <Outlet /> {/* Nested Route Rendering */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

const User: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='profile' element={<Profile />} />
        <Route path='profile/edit' element={<UpdateProfile />} />
      </Route>
    </Routes>
  )
}

export default User
