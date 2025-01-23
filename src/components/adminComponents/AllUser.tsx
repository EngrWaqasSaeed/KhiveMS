import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import 'animate.css'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { userState } from '../../recoil/atoms/userState'

const AllUser: React.FC = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [filteredUserDetails, setFilteredUserDetails] = useState<any[]>([])

  const { allUsers } = useRecoilValue(userState)

  useEffect(() => {
    setFilteredUserDetails(allUsers)
  }, [allUsers])

  //Debounce Search login
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 400)
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

  return (
    <div className='p-4'>
      <div className='text-left'>
        <h1 className='text-2xl font-semibold mb-5 text-red-800'>
          Employee Details:
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
                <th className='border px-4 py-2'>Joining Date</th>
                <th className='border px-4 py-2'>Date of Birth</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserDetails.map((user, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='border px-4 py-2'>{user.name}</td>
                  <td className='border px-4 py-2'>{user.email}</td>
                  <td className='border px-4 py-2'>{user.cnic}</td>
                  <td className='border px-4 py-2'>{user.joining_date}</td>
                  <td className='border px-4 py-2'>{user.date_of_birth}</td>
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

export default AllUser
