import React, { useState, useEffect } from 'react'
import 'animate.css'
import { FiEdit, FiTrash } from 'react-icons/fi'
import axios from 'axios'

const AllAttendence: React.FC = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [filteredUserDetails, setFilteredUserDetails] = useState<any[]>([])
  const [userAttendenceDetails, setUserAttendenceDetails] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/users/allusers')
      .then(({ data }) => {
        console.log('All user data:', data)

        const allAttendance = data.flatMap((user: any) =>
          user.attendences.map((attendance: any) => ({
            userName: user.name, // Get user's name
            points: user.points,
            ...attendance // Spread attendance details
          }))
        )

        setUserAttendenceDetails(allAttendance)
        setFilteredUserDetails(allAttendance) // Initially set all data to be shown
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  //  Debounce function
  const debounce = (func: Function, delay: number) => {
    let timer: number
    return (...args: any) => {
      clearTimeout(timer)
      timer = window.setTimeout(() => func(...args), delay)
    }
  }

  // Filtering Functionality
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      let filteredData = userAttendenceDetails

      // If name is provided, filter by userName
      if (name) {
        filteredData = filteredData.filter(attendance =>
          attendance.userName.toLowerCase().includes(name.toLowerCase())
        )
      }

      // If date is provided, filter by date
      if (date) {
        filteredData = filteredData.filter(
          attendance =>
            new Date(attendance.date).toISOString().split('T')[0] === date
        )
      }

      setFilteredUserDetails(filteredData)
    }, 700) // 1-second debounce delay

    debouncedFilter()
  }, [name, date, userAttendenceDetails])

  const handleEdit = (index: number) => {
    alert(`Edit row ${index}`)
  }

  const handleDelete = (index: number) => {
    alert(`Delete row ${index}`)
  }

  return (
    <div className='p-4'>
      <div className='text-left'>
        <h1 className='text-2xl font-semibold mb-5 text-red-800'>
          Attendance Details:
        </h1>
      </div>
      <div className='flex items-center space-x-4 mb-4'>
        <input
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={e => setName(e.target.value)}
          className='border border-gray-300 rounded px-3 py-2'
        />
        <input
          type='date'
          value={date}
          onChange={e => setDate(e.target.value)}
          className='border border-gray-300 rounded px-3 py-2'
        />
        <button className='bg-blue-500 text-white px-4 py-2 rounded animate__animated animate__shakeX'>
          Search
        </button>
      </div>
      {filteredUserDetails.length > 0 ? (
        <div className='overflow-y-auto' style={{ maxHeight: '345px' }}>
          <table className='min-w-full border border-gray-300'>
            <thead className='sticky top-0 bg-gray-100'>
              <tr>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Joining Status</th>
                <th className='border px-4 py-2'>Check-In</th>
                <th className='border px-4 py-2'>Check-Out</th>
                <th className='border px-4 py-2'>Point</th>
                <th className='border px-4 py-2'>Date</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map((attendance, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='border px-4 py-2'>{attendance.userName}</td>
                  <td className='border px-4 py-2'>{attendance.workStatus}</td>

                  <td className='border px-4 py-2'>
                    {attendance.checkin
                      ? new Date(attendance.checkin).toLocaleTimeString(
                          'en-PK',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true,
                            timeZone: 'Asia/Karachi'
                          }
                        )
                      : 'N/A'}
                  </td>
                  <td className='border px-4 py-2'>
                    {attendance.checkout
                      ? new Date(attendance.checkout).toLocaleTimeString(
                          'en-PK',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true,
                            timeZone: 'Asia/Karachi'
                          }
                        )
                      : 'N/A'}
                  </td>
                  <td className='border px-4 py-2'>
                    {attendance.points || '-'}
                  </td>
                  <td className='border px-4 py-2'>
                    {attendance.date
                      ? new Date(attendance.date).toLocaleDateString('en-GB')
                      : 'Loading'}
                  </td>
                  <td className='border px-4 py-2 flex space-x-2'>
                    <button
                      onClick={() => handleEdit(index)}
                      className='flex text-blue-500 hover:underline'
                    >
                      Edit
                      <FiEdit className='ml-2 mt-1' />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className='flex text-red-500 hover:underline'
                    >
                      Delete
                      <FiTrash className='ml-2 mt-1' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='text-gray-500 mt-4'>
          No data found for the search criteria.
        </p>
      )}
    </div>
  )
}

export default AllAttendence
