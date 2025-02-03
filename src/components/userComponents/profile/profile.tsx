import React, { useEffect, useState } from 'react'
import './profile.css'

import { useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import profileImage from '../../../assets/images/HRjpg.jpg'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  userId: number // ID of the user
  name: string // Name of the user
  email: string
  contact_number: string
  joiningDate: string
  dateOFBirth: string
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<DecodedToken | null>(null) // State to hold decoded token data
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token') // Retrieve token from local storage

    if (!token) {
      console.warn('Token not found. Please log in.')
      // You can redirect the user or show a message if necessary
    } else {
      try {
        console.log('Token found:', token)

        const decoded: DecodedToken = jwtDecode<DecodedToken>(token)
        setUserData(decoded) // Update the state with decoded data
        console.log('Decoded token:', decoded)
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, []) // Dependency array ensures this runs only once

  return (
    <div className='main-container flex flex-col items-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-80 mt-10'>
        {/* Profile Image Section */}
        <div className='relative mb-4'>
          <img
            src={profileImage}
            alt='Profile'
            className='w-32 h-32 rounded-full mx-auto border-4 border-gray-300'
          />
          <button className='absolute bottom-0 right-20 bg-red-800 text-white p-2 rounded-full shadow-lg hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-white'>
            <FaEdit />
          </button>
        </div>

        {/* Profile Details Section */}
        <div className='text-center mb-6'>
          <h2 className='text-lg font-semibold text-gray-700 mb-6'>
            {userData ? userData.name : 'Loading...'}
          </h2>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm text-gray-600 font-medium'>
              <span>Email:</span>
              <span className='font-normal'>
                {userData ? userData.email : 'Loading...'}
              </span>
            </div>
            <div className='flex justify-between text-sm text-gray-600 font-medium'>
              <span>Contact Number:</span>
              <span className='font-normal'>
                +923{userData ? userData.contact_number : 'lOADING...'}
              </span>
            </div>
            <div className='flex justify-between text-sm text-gray-600 font-medium'>
              <span>Joining_Date:</span>
              <span className='font-normal'>
                {' '}
                {userData?.joiningDate
                  ? new Date(userData.joiningDate).toLocaleDateString('en-GB') // Formats as YYYY-MM-DD
                  : 'Loading'}
              </span>
            </div>
            <div className='flex justify-between text-sm text-gray-600 font-medium'>
              <span>DOB:</span>
              <span className='font-normal'>
                {' '}
                {userData?.dateOFBirth
                  ? new Date(userData.dateOFBirth).toLocaleDateString('en-GB') // Formats as YYYY-MM-DD
                  : 'Loading'}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className='text-center'>
          <button
            onClick={() => navigate('/user/profile/edit')}
            className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
