import React from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi' // Import icons from react-icons <FiEdit /><FiTrash />

const EmployeeTable: React.FC = () => {
  const employees = [
    {
      name: 'Usman',
      email: 'Usman@example.com',
      dob: '1990-01-15',
      joiningDate: '2020-06-01',
      post: 'Manager'
    },
    {
      name: 'Waqas',
      email: 'Waqas@example.com',
      dob: '1992-03-22',
      joiningDate: '2021-07-15',
      post: 'Developer'
    },
    {
      name: 'Huziafa',
      email: 'Huziafa@example.com',
      dob: '1988-09-05',
      joiningDate: '2019-08-20',
      post: 'Designer'
    }
  ]

  const handleEdit = (index: number) => {
    console.log(`Edit employee at index ${index}`)
    // Add your edit logic here
  }

  const handleDelete = (index: number) => {
    console.log(`Delete employee at index ${index}`)
    // Add your delete logic here
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Employee Details</h1>
      <table className='w-full table-auto border-collapse border border-gray-200'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-200 px-4 py-2 text-left'>Name</th>
            <th className='border border-gray-200 px-4 py-2 text-left'>
              Email
            </th>
            <th className='border border-gray-200 px-4 py-2 text-left'>DOB</th>
            <th className='border border-gray-200 px-4 py-2 text-left'>
              Joining Date
            </th>
            <th className='border border-gray-200 px-4 py-2 text-left'>Post</th>
            <th className='border border-gray-200 px-4 py-2 text-left'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className='hover:bg-gray-50'>
              <td className='border border-gray-200 px-4 py-2'>
                {employee.name}
              </td>
              <td className='border border-gray-200 px-4 py-2'>
                {employee.email}
              </td>
              <td className='border border-gray-200 px-4 py-2'>
                {employee.dob}
              </td>
              <td className='border border-gray-200 px-4 py-2'>
                {employee.joiningDate}
              </td>
              <td className='border border-gray-200 px-4 py-2'>
                {employee.post}
              </td>
              <td className='border border-gray-200 px-4 py-2 flex space-x-4 pl-12'>
                <button
                  onClick={() => handleEdit(index)}
                  className='text-blue-500 hover:text-blue-700'
                  title='Edit'
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className='text-red-500 hover:text-red-700'
                  title='Delete'
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600'>
        Add New Employee
      </button>
    </div>
  )
}

export default EmployeeTable
