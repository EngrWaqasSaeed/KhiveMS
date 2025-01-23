import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/adminComponents/Sidebar'
import AllUser from '../../components/adminComponents/AllUser'
import { Outlet, Route, Routes } from 'react-router-dom'
import AllAttendence from '../../components/adminComponents/AllAttendence'
import AllBreak from '../../components/adminComponents/AllBreak'
import AllMeeting from '../../components/adminComponents/AllMeeting'
import AllProject from '../../components/adminComponents/AllProject'
import AttendenceUpdate from '../../components/adminComponents/updateDetails/AttendenceUpdate'
import Dashboard from '../../components/adminComponents/DashboardBoxes'

const Admin: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            paddingRight: '0px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  )
}

const AdminComponent: React.FC = () => {
  return (
    <Routes>
      {/* Admin Layout Route */}
      <Route path='/' element={<Admin />}>
        {/* Nested Routes */}
        <Route index element={<Dashboard />} /> {/* Default route */}
        <Route path='user' element={<AllUser />} />
        <Route path='attendence' element={<AllAttendence />} />
        <Route path='break' element={<AllBreak />} />
        <Route path='meeting' element={<AllMeeting />} />
        <Route path='project' element={<AllProject />} />
      </Route>
    </Routes>
  )
}

export default AdminComponent
