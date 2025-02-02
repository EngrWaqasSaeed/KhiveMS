import React, { useState, useEffect } from 'react'
import './updateProfile.css'
import profileImage from '../../../assets/images/HRjpg.jpg'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  id: number // ID of the user
}

const UpdateProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    cnic: '',
    joining_Date: '',
    date_Of_Birth: ''
  })

  const token = localStorage.getItem('token')
  if (!token) {
    console.warn('Token not found. Please log in.')
    // You can redirect the user or show a message if necessary
    return
  }
  const decoded: DecodedToken = jwtDecode<DecodedToken>(token)

  const userId = decoded.id // Assuming the signed-in user's ID is stored in localStorage
  console.log('User id is:', userId)

  if (!token || !userId) {
    console.log('Token or User ID not found')
    return null
  }

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      console.log('User Id is:', userId)
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setProfile(response.data)
        console.log('Fetch user details is ', response)
      } catch (error) {
        console.error('Error fetching user data in get route:', error)
      }
    }

    fetchUserData()
  }, [userId, token])

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }))
  }
  console.log('profile is:', profile)
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/${profile.id}`,
        {
          name: profile.name,
          cnic: profile.cnic,
          joiningDate: new Date(profile.joining_Date),
          dateOfBirth: new Date(profile.date_Of_Birth)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log('Updated Profile:', response.data)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  return (
    <div className='main-container flex flex-col items-center bg-gray-100'>
      <div className='sub-container bg-white p-6 rounded-lg shadow-lg mt-5'>
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
              CNIC
            </label>
            <input
              type='text'
              name='cnic'
              value={profile.cnic}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-600 mb-1'>
              Joining Date
            </label>
            <input
              type='date'
              name='joiningDate'
              value={profile.joining_Date}
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
              name='dateOfBirth'
              value={profile.date_Of_Birth}
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
