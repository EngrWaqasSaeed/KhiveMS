import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import 'animate.css'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { userState } from '../../recoil/atoms/userState'

const AllProject: React.FC = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [filteredUserDetails, setFilteredUserDetails] = useState<any[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<any[]>([])

  const { allUsers } = useRecoilValue(userState)

  useEffect(() => {
    setFilteredUserDetails(allUsers)
  }, [allUsers])

  // Debounce Search logic
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 400) // .4 sec seconds debounce delay

    // Cleanup timeout if name or date change before .4 seconds
    return () => clearTimeout(timeoutId)
  }, [name, date])

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

  const handleSubmit = () => {
    const updatedUsers = filteredUserDetails.map((user, index) => {
      if (!selectedStatuses.includes(user.id)) {
        return { ...user, joining_status: 'Missed' }
      }
      return user
    })
    setFilteredUserDetails(updatedUsers)
  }

  return (
    <div className='p-4'>
      <div className='text-left'>
        <h1 className='text-2xl font-semibold mb-5 text-red-800'>
          Project Details:
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
      {filteredUserDetails.length > 0 ? (
        <div className='overflow-y-auto' style={{ maxHeight: '345px' }}>
          <table className='min-w-full border border-gray-300'>
            <thead className='sticky top-0 bg-gray-100'>
              <tr>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Email</th>
                <th className='border px-4 py-2'>CNIC</th>
                <th className='border px-4 py-2'>Submit Status</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map((user, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='border px-4 py-2'>{user.name}</td>
                  <td className='border px-4 py-2'>{user.email}</td>
                  <td className='border px-4 py-2'>{user.cnic}</td>
                  <td className='border px-4 py-2'>
                    <select
                      value={selectedStatuses[index] || 'Select'}
                      onChange={e => handleStatusChange(index, e.target.value)}
                      className='border px-2 py-1 rounded'
                    >
                      <option value='Select'>Select</option>
                      <option value='Early'>Early</option>
                      <option value='Ontime'>Ontime</option>
                      <option value='Late'>Late</option>
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

      {/* Show submit button when statuses have been selected */}
      {selectedStatuses.length === allUsers.length && (
        <div className='mt-4'>
          <button
            onClick={handleSubmit}
            className='bg-green-500 text-white px-4 py-2 rounded'
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default AllProject
