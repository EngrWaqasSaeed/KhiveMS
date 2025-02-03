import React, { useState, useEffect } from 'react'
import 'animate.css'
import { FiEdit, FiTrash } from 'react-icons/fi'
import axios from 'axios'

const AllBreak: React.FC = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [allUsers, setAllUsers] = useState<any[]>([]) // Store all users
  const [filteredUserDetails, setFilteredUserDetails] = useState<any[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token') // Retrieve token from local storage or state
    console.log('Token is :' + token)

    if (!token) {
      console.log('Token is Not Founded')
      return
    } else {
      axios.get('http://localhost:3001/api/users/allusers').then(({ data }) => {
        console.log('All user data:', data)
        setAllUsers(data) // Store full user list
        setFilteredUserDetails(data) // Initially, show all users
      })
    }
  }, [name, date])

  // Function to debounce search (1 second delay)
  const debounce = (func: Function, delay: number) => {
    let timer: number
    return (...args: any) => {
      clearTimeout(timer)
      timer = window.setTimeout(() => func(...args), delay)
    }
  }

  // Search function (filters from allUsers, does not modify it)
  const handleSearch = () => {
    const filtered = allUsers.filter(user => {
      const matchesName = name
        ? user.name.toLowerCase().includes(name.toLowerCase())
        : true
      const matchesDate = date ? user.joining_date === date : true
      return matchesName && matchesDate
    })
    setFilteredUserDetails(filtered)
  }

  useEffect(() => {
    if (!name && !date) {
      setFilteredUserDetails(allUsers) // Ensure the table is initially populated
    } else {
      const debouncedSearch = debounce(handleSearch, 700)
      debouncedSearch()
    }
  }, [name, date, allUsers])

  const handleEdit = (index: number) => {
    alert(`Edit row ${index}`)
  }

  const handleDelete = (index: number) => {
    alert(`Delete row ${index}`)
  }
  const handleStatusChange = (index: number, status: string) => {
    const updatedStatuses = [...selectedStatuses]
    updatedStatuses[index] = status
    setSelectedStatuses(updatedStatuses)
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token') // Retrieve token from local storage or state
    console.log('Token is :' + token)

    if (!token) {
      console.log('Token is Not Founded')
      return
    } else {
      console.log(token)
    }

    const statusData = filteredUserDetails.map((user, index) => ({
      userId: user.id,
      break_status: selectedStatuses[index] || 'ONTIME' // Default to 'ONTIME' if not selected
    }))
    try {
      const response = await axios.post(
        'http://localhost:3001/api/break',
        {
          statuses: statusData
        },
        { headers: { Authorization: 'Bearer ' + token } }
      )

      if (response.status === 200) {
        alert('All Break statuses saved successfully!')
      }
    } catch (error) {
      console.error('Error updating Break statuses:', error)
      alert('Failed to update Break statuses.')
    }
  }

  return (
    <div className='p-4'>
      <div className='text-left'>
        <h1 className='text-2xl font-semibold mb-5 text-red-800'>
          Break Details:
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
        <button className='bg-green-500 text-white' onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {filteredUserDetails.length > 0 ? (
        <div className='overflow-y-auto' style={{ maxHeight: '345px' }}>
          <table className='min-w-full border border-gray-300'>
            <thead className='sticky top-0 bg-gray-100'>
              <tr>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Email</th>
                <th className='border px-4 py-2'>CNIC</th>
                <th className='border px-4 py-2'>Joining Status</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map((user, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='border px-4 py-2'>{user.name}</td>
                  <td className='border px-4 py-2'>{user.email}</td>
                  <td className='border px-4 py-2'>
                    {user.cnic ? user.cnic : 'Not Provided'}
                  </td>
                  <td className='border px-4 py-2'>
                    <select
                      value={selectedStatuses[index] || 'Select'}
                      onChange={e => handleStatusChange(index, e.target.value)}
                      className='border px-2 py-1 rounded'
                    >
                      <option value='Select'>Select</option>
                      <option value='EARLY'>Early</option>
                      <option value='ONTIME'>Ontime</option>
                      <option value='LATE'>Late</option>
                      <option value='MISSED'>Missed</option>
                    </select>
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
        <p className='text-gray-500'>No matching records found.</p>
      )}
    </div>
  )
}

export default AllBreak
