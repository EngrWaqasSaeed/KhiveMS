import React, { useEffect, useState } from 'react'

const AttendanceTable: React.FC = () => {
  const attendanceData = [
    {
      name: 'Waqas Saeed',
      workStatus: { checkIn: '10:00 AM', checkOut: '6:00 PM' },
      location: 'Office',
      points: 10,
      reason: ''
    },
    {
      name: 'Huzaifa Saleem',
      workStatus: { checkIn: '9:15 AM', checkOut: '5:10 PM' },
      location: 'Remote',
      points: 9,
      reason: ''
    },
    {
      name: 'Usman CHANKANA',
      workStatus: { checkIn: '10:00 AM', checkOut: '6:00 PM' },
      location: 'Hybrid',
      points: 10,
      reason: ''
    },
    {
      name: 'Waqar Ahmed',
      workStatus: { checkIn: '9:15 AM', checkOut: '5:10 PM' },
      location: 'Office',
      points: 9,
      reason: ''
    }
    // Add more rows as needed
  ]

  const [name, setName] = useState('')
  const [filteredData, setFilteredData] = useState(attendanceData) // State for filtered data

  // Filter attendance data when name input changes
  useEffect(() => {
    const filtered = attendanceData.filter(user => {
      const matchesName = name
        ? user.name.toLowerCase().includes(name.toLowerCase())
        : true
      return matchesName
    })
    setFilteredData(filtered) // Update filtered data state
  }, [name]) // Re-run effect whenever the `name` state changes

  return (
    <div className='p-4 space-y-4'>
      {/* Attendance Status Title */}
      <div className='text-left'>
        <h1 className='text-2xl font-semibold'>Attendance Status</h1>
      </div>

      {/* Search Input */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by Name'
          value={name}
          onChange={e => setName(e.target.value)} // Update name state on input change
          className='w-full px-3 py-2 border border-gray-300 rounded'
        />
      </div>

      {/* Responsive Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto border-collapse border border-gray-300'>
          <thead className='text-white' style={{ backgroundColor: '#CC2B52' }}>
            <tr>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Name
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Work Status
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Location
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Points
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className='odd:bg-white even:bg-gray-50'>
                <td className='border border-gray-300 px-4 py-2'>{row.name}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  <div>
                    <p>Check In: {row.workStatus.checkIn}</p>
                    <p>Check Out: {row.workStatus.checkOut}</p>
                  </div>
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {row.location}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {row.points}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  <input
                    type='text'
                    placeholder='Enter reason'
                    value={row.reason}
                    onChange={e => {
                      // Handle reason change if needed
                    }}
                    className='w-full px-2 py-1 border border-gray-300 rounded'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceTable
