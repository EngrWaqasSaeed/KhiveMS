import React from 'react'
import { useRecoilValue } from 'recoil'
import Khive from '../assets/images/kryptohive_logo.jpg'
import HR from '../assets/images/HRjpg.jpg'
import { FaBell, FaEnvelope } from 'react-icons/fa'
import { adminState } from '../../src/recoil/atoms/adminState'
import { userState } from '../../src/recoil/atoms/userState'

import { loginUserState } from '../recoil/atoms/loginUserState'

const Header: React.FC = () => {
  // Fetch user and admin details from Recoil
  const loginUserDetails = useRecoilValue(loginUserState)
  console.log('In Header The value of user is: ' + loginUserDetails)
  // const userDetails = useRecoilValue(userState)
  // const adminDetails = useRecoilValue(adminState)

  // // // Determine whether the user is an admin or regular user
  // // const isAdmin = adminDetails.adminDetails.role === 'admin'
  // // const details: typeof adminDetails.adminDetails = isAdmin
  // //   ? adminDetails.adminDetails
  // //   : userDetails.allUsers

  return (
    <header
      style={{
        padding: '10px',
        background: '#2A0001',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '99vw',
        boxSizing: 'border-box'
      }}
    >
      {/* Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src={Khive}
          alt='K-Hive Logo'
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>K-HIVE</h1>
      </div>

      {/* Notification and User Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Notification Icon */}
        <div style={{ position: 'relative' }}>
          <FaBell size={24} />
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '10px',
              height: '10px',
              background: 'red',
              borderRadius: '50%'
            }}
          ></span>
        </div>

        {/* Messages Icon */}
        <div style={{ position: 'relative' }}>
          <FaEnvelope size={24} />
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '10px',
              height: '10px',
              background: 'red',
              borderRadius: '50%'
            }}
          ></span>
        </div>

        {/* User Information */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <p>
              <strong>{loginUserDetails?.name}</strong>
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem' }}>
              {loginUserDetails?.email}
            </p>
          </div>
          <img
            src={HR}
            alt='User Avatar'
            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
