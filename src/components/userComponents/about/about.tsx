import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { checkinState } from '../../../recoil/atoms/checkinState'
import { checkoutState } from '../../../recoil/atoms/checkoutState'
import axios from 'axios'

const About: React.FC = () => {
  const [projectStatus, setProjectStatus] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get('/api/project')
      .then(response => {
        console.log(response)
        if (
          Array.isArray(response.data.projectStatus) &&
          response.data.projectStatus.length > 0
        ) {
          setProjectStatus(response.data.projectStatus[0].project_status)
        } else {
          setProjectStatus('No Status Available')
        }
      })
      .catch(error => {
        console.error('Error fetching project status:', error)
        setProjectStatus('Error fetching status')
      })
  }, [])
  const checkinDeatails = useRecoilValue(checkinState)
  const checkoutDetails = useRecoilValue(checkoutState)

  return (
    <div
      className='flex flex-col items-center bg-gray-100'
      style={{ height: '100vh' }}
    >
      <div className='bg-white p-6 rounded-lg mt-10 shadow-lg w-4/5'>
        {/* Headings Section */}
        <div className='flex justify-between items-center mb-4 border-b pb-2'>
          <h2 className='text-lg font-semibold text-gray-700 w-5/6'>
            Activity
          </h2>
          <h2 className='text-lg font-semibold text-gray-700 w-1/6 text-right'>
            Points
          </h2>
        </div>

        {/* Table Section */}
        <div className='flex'>
          {/* Activity Column */}
          <div className='w-5/6'>
            <table className='table-auto w-full text-left border-collapse'>
              <thead>
                <tr>
                  <th className='border-b py-2 text-sm font-medium text-gray-600'>
                    Activity Name
                  </th>
                  <th className='border-b py-2 text-sm font-medium text-gray-600'>
                    Description
                  </th>
                  <th className='border-b py-2 text-sm font-medium text-gray-600'>
                    WorkStatus
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    CheckIn{' '}
                  </td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    {checkinDeatails?.checkin
                      ? new Date(checkinDeatails.checkin).toLocaleTimeString(
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
                  <td className='border-b py-2 text-sm text-gray-700'>
                    {checkinDeatails?.workStatus
                      ? checkinDeatails.workStatus
                      : 'Not Updated Yet'}
                  </td>
                </tr>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>Break</td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    Return Time
                  </td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    2025-01-02
                  </td>
                </tr>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    Project Submition
                  </td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    {projectStatus}
                  </td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    2025-01-03
                  </td>
                </tr>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    CheckOut Time
                  </td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    {checkoutDetails?.checkout
                      ? new Date(checkoutDetails.checkout).toLocaleTimeString(
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
                  <td className='border-b py-2 text-sm text-gray-700'>
                    {checkinDeatails?.workStatus
                      ? checkinDeatails.workStatus
                      : 'Not Updated Yet'}
                  </td>
                </tr>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    Bounes Point
                  </td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    Description of Bounce
                  </td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    2025-01-03
                  </td>
                </tr>
                <br />
                <tr className='font-medium'>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    Total Point
                  </td>
                  <td className='border-b py-2 text-sm text-gray-700'></td>
                  <td className='border-b py-2 text-sm text-gray-700'>
                    2025-01-03
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Points Column */}
          <div className='w-1/6 text-right'>
            <table className='table-auto w-full text-right border-collapse'>
              <thead>
                <tr>
                  <th className='border-b py-2 text-sm font-medium text-gray-600'>
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>10</td>
                </tr>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>20</td>
                </tr>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>30</td>
                </tr>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>10</td>
                </tr>
                <tr>
                  <td className='border-b py-2 text-sm text-gray-700'>20</td>
                </tr>
                <br />
                <tr>
                  <td className='font-medium border-b py-2 text-sm text-gray-700'>
                    30
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
