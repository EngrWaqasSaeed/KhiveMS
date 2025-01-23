import React, { useState } from 'react'
import 'animate.css'
import { FiEdit, FiTrash } from 'react-icons/fi' // Import icons from react-icons <FiEdit /><FiTrash />
const MeetingUpdate: React.FC = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [userDetails, setUserDetails] = useState<any[]>([])

  const handleSearch = () => {
    // Replace with actual fetch logic
    const mockData = [
      {
        name: 'Usman',
        status: 'Early',
        point: 10,
        date: '2025-01-20'
      },
      {
        name: 'Huzaifa',
        status: 'Ontime',
        checkin: '8:30 AM',
        checkout: '4:30 PM',
        point: 12,
        date: '2025-01-20'
      },
      {
        name: 'Usman',
        status: 'Early',
        point: 10,
        date: '2025-01-20'
      },
      {
        name: 'Huzaifa',
        status: 'Ontime',
        checkin: '8:30 AM',
        checkout: '4:30 PM',
        point: 12,
        date: '2025-01-20'
      },
      {
        name: 'Usman',
        status: 'Early',
        point: 10,
        date: '2025-01-20'
      },
      {
        name: 'Huzaifa',
        status: 'Ontime',
        checkin: '8:30 AM',
        checkout: '4:30 PM',
        point: 12,
        date: '2025-01-20'
      },
      {
        name: 'Usman',
        status: 'Early',
        point: 10,
        date: '2025-01-20'
      },
      {
        name: 'Huzaifa',
        status: 'Ontime',
        checkin: '8:30 AM',
        checkout: '4:30 PM',
        point: 12,
        date: '2025-01-20'
      }
    ]
    setUserDetails(mockData)
  }

  const handleEdit = (index: number) => {
    alert(`Edit row ${index}`)
  }

  const handleDelete = (index: number) => {
    alert(`Delete row ${index}`)
  }

  return (
    <div className='p-4'>
      <div className='text-left'>
        <h1 className='text-2xl font-semibold mb-5 text-red-800 '>
          Meeting Details:
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
        <button
          onClick={handleSearch}
          className='bg-blue-500 text-white px-4 py-2 rounded animate__animated animate__shakeX'
        >
          Search
        </button>
      </div>
      {userDetails.length > 0 && (
        <div className='overflow-y-auto' style={{ maxHeight: '245px' }}>
          <table className='min-w-full border border-gray-300'>
            <thead className='sticky top-0 bg-gray-100  '>
              <tr className='bg-gray-100'>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Meeting Status</th>
                <th className='border px-4 py-2'>Point</th>
                <th className='border px-4 py-2'>Date</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((user, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='border px-4 py-2'>{user.name}</td>
                  <td className='border px-4 py-2'>{user.status}</td>
                  <td className='border px-4 py-2'>{user.point}</td>
                  <td className='border px-4 py-2'>{user.date}</td>
                  <td className='border px-4 py-2 flex space-x-2'>
                    <div className='flex text-center justify-center w-32 '>
                      <button
                        onClick={() => handleEdit(index)}
                        className='flex  text-blue-500 hover:underline ml-32 '
                      >
                        Edit
                        <FiEdit className='ml-3 mt-1' />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className='flex text-red-500 hover:underline ml-8'
                      >
                        Delete
                        <FiTrash className='ml-3 mt-1' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MeetingUpdate
