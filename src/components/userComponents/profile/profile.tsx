import React from 'react'
import './profile.css'
import { FaEdit } from 'react-icons/fa'
import profileImage from '../../../assets/images/HRjpg.jpg'

const Profile: React.FC = () => {
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
            Rukzana Shafiq
          </h2>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm text-gray-600 font-medium'>
              <span>Email:</span>
              <span className='font-normal'>Ruksana@gmail.com</span>
            </div>
            <div className='flex justify-between text-sm text-gray-600 font-medium'>
              <span>CNIC:</span>
              <span className='font-normal'>12345-567890-1</span>
            </div>
            <div className='flex justify-between text-sm text-gray-600 font-medium'>
              <span>Post:</span>
              <span className='font-normal'>Software Engineer</span>
            </div>
            <div className='flex justify-between text-sm text-gray-600 font-medium'>
              <span>DOB:</span>
              <span className='font-normal'>30 NOV 2003</span>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className='text-center'>
          <button className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
