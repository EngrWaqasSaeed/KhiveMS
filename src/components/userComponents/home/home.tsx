import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css' // Import Quill CSS
import ReactQuill from 'react-quill'
import './home.css'
import 'animate.css'
import 'font-awesome/css/font-awesome.min.css' // Import Font Awesome CSS
import axios from 'axios'
import { checkinState } from '../../../recoil/atoms/checkinState'
import { useSetRecoilState } from 'recoil'
import { checkoutState } from '../../../recoil/atoms/checkoutState'

const CheckinCheckoutForm: React.FC = () => {
  const [checkinText, setCheckinText] = useState('')
  const [checkoutText, setCheckoutText] = useState('')
  const [isCheckedIn, setIsCheckedIn] = useState(
    localStorage.getItem('isCheckIn') === 'true'
  ) // Track if the user has checked in
  const [isCheckedOut, setIsCheckedOut] = useState(
    localStorage.getItem('isCheckedOut') === 'true'
  ) // Track if the user has checked out
  const [workStatus, setWorkStatus] = useState('HYBRID')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const setCheckin = useSetRecoilState(checkinState)
  const setCheckout = useSetRecoilState(checkoutState)

  const handleCheckin = async () => {
    if (checkinText.trim()) {
      try {
        const token = localStorage.getItem('token') // Retrieve token from local storage or state
        console.log('Token is :' + token)

        if (!token) {
          console.log('Token is Not Founded')
          return
        } else {
          const response = await axios.post(
            'http://localhost:3001/api/attendence/checkin',
            {
              todayTask: checkinText,
              workStatus
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          alert('CheckIn Successfully')
          setIsCheckedIn(true) // Mark as checked in
          localStorage.setItem('isCheckedIn', 'true')
          setError('')
          console.log('Submitted form data presenrt here', response.data)
          //Update the recoil state when the user is check in
          setCheckin({
            userId: response.data.data.userId,
            checkin: response.data.data.checkin,
            date: response.data.data.date,
            todayTask: checkinText,
            workStatus: workStatus,
            setIsCheckedIn: true
          })
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            'Something went wrong during the check-in'
        )
        setMessage('')
      }
    }
  }

  const handleCheckout = async () => {
    if (checkoutText.trim()) {
      try {
        const token = localStorage.getItem('token') // Retrieve token from local storage

        if (!token) {
          setError('Token not found. Please log in again.')
          return // Exit the function if token is null
        }

        const response = await axios.post(
          'http://localhost:3001/api/attendence/checkout',
          {
            dayReport: checkoutText
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        alert('CheckOut Successfully')
        setIsCheckedOut(true)
        localStorage.setItem('isCheckOut', 'true')
        localStorage.removeItem('isCheckedIn')
        console.log('Logout Response Data is:', response.data)
        //Update the recoil state when the user is check in

        setCheckout({
          userId: response.data.data.id,
          date: response.data.data.date,
          dayReport: response.data.data.dayReport,
          checkout: response.data.data.checkout
        })

        setIsCheckedOut(true) // Mark as checked out
        setError('')
      } catch (err: any) {
        err.response?.data?.message || 'SomeThing Wents Wrong During CheckOut'
      }
    }
  }
  useEffect(() => {
    const storedCheckin = localStorage.getItem('isCheckedIn') === 'true'
    const storedCheckout = localStorage.getItem('isCheckedOut') === 'true'

    setIsCheckedIn(storedCheckin)
    setIsCheckedOut(storedCheckout)

    setTimeout(() => {
      localStorage.setItem('isCheckOut', 'false')
    }, 10000) // 12 hours in milliseconds
  }, [])

  return (
    <div className='main-container flex flex-col bg-gray-100 mt-0'>
      <div className='sub_container bg-white p-6 rounded-lg shadow-lg sub-container mt-6 ml-10 h-56'>
        {/* Check-in Section */}
        {!isCheckedIn && !isCheckedOut && (
          <div className='mb-6'>
            <label
              htmlFor='checkin'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Today Task:
            </label>
            <div className='flex items-center'>
              <ReactQuill
                value={checkinText}
                onChange={setCheckinText}
                className='flex-1 rounded-l-md resize-none h-20'
              />
              {/* Work Status Dropdown */}
              <div className='ml-4'>
                <label
                  htmlFor='workStatus'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Work Status:
                </label>
                <select
                  id='workStatus'
                  value={workStatus}
                  onChange={e => setWorkStatus(e.target.value)}
                  className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 max-w-48'
                >
                  <option value='ONSITE'>Onsite</option>
                  <option value='WORKFORMHOME'>Remote</option>
                  <option value='HYBRID'>Hybrid</option>
                </select>
              </div>
              <button
                onClick={handleCheckin}
                className='animate__animated animate__shakeX px-4 py-2 mt-7 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-4 flex items-center'
              >
                Check-in
              </button>
            </div>
          </div>
        )}

        {/* Check-out Section */}
        {isCheckedIn && !isCheckedOut && (
          <div>
            <label
              htmlFor='checkout'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Day Report:
            </label>
            <div className='flex items-center'>
              <ReactQuill
                value={checkoutText}
                onChange={setCheckoutText}
                className='flex-1 rounded-l-md  resize-none h-20'
              />
              <button
                onClick={handleCheckout}
                className='px-4 py-2  mt-16 bg-green-500 text-white font-semibold rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ml-4'
              >
                Check-out
              </button>
            </div>
          </div>
        )}

        {/* Good Bye message */}
        {isCheckedOut && (
          <div className='mt-6 text-center text-lg font-medium text-green-500'>
            Good Bye! Have a Good Day ⭐
          </div>
        )}
      </div>

      {/* Bonus Section */}
      <div className='sub-container bg-gray-50 p-4 rounded-lg border border-gray-300 ml-10 mt-6'>
        <h3 className='text-lg font-medium text-gray-700 mb-4'>Bonus Box</h3>
        <div className='mb-4 flex items-center'>
          <label
            htmlFor='option1'
            className='text-sm font-medium text-gray-700 mr-5'
          >
            Punctuality Bonus:
          </label>
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-10 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-10 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-10 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='checkbox'
            id='option1'
            className='mr-10 focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <div className='mb-4 flex items-center'>
          <label
            htmlFor='option2'
            className='text-sm font-medium text-gray-700 mr-3'
          >
            Performance Bonus:
          </label>
          <input
            type='checkbox'
            id='option2'
            className='mr-2 focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <div className='flex items-center'>
          <label
            htmlFor='number'
            className='block text-sm font-medium text-gray-700 mr-2'
          >
            Total Bonus Points:
          </label>
          <input
            type='number'
            id='number'
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 max-w-28'
          />
        </div>
      </div>
    </div>
  )
}

export default CheckinCheckoutForm
