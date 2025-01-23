import React, { useState } from 'react'
import './updateProfile.css'
import profileImage from '../../../assets/images/HRjpg.jpg'

const UpdateProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Ruksana Shafiq',
    email: 'Ruksana@gmail.com',
    cnic: '12345-567890-1',
    post: 'Software Engineer',
    dob: '2003-11-30'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Updated Profile:', profile)
  }

  return (
    <div className='main-container flex flex-col items-center bg-gray-100'>
      <div className='sub-container bg-white p-6 rounded-lg shadow-lg  mt-5'>
        {/* Profile Image Section */}
        <div className='relative mb-4'>
          <img
            src={profileImage}
            alt='Profile'
            className='w-20 h-20 rounded-full mx-auto border-4 border-gray-300'
          />
        </div>

        {/* Update Profile Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={profile.name}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={profile.email}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value='password'
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>
              Date of Birth
            </label>
            <input
              type='date'
              name='dob'
              value={profile.dob}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
