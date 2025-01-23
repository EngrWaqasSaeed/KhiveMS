import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { adminState } from '../../recoil/atoms/adminState'
import { FaUserAlt, FaClock, FaProjectDiagram, FaTasks } from 'react-icons/fa'
import AttendenceUpdate from './updateDetails/AttendenceUpdate'
import MeetingUpdate from './updateDetails/MeetingUpdates'
import BreakUpdate from './updateDetails/BreakUpdate'
import ProjectUpdate from './updateDetails/ProjectUpdate'
import AllAttendence from './AllAttendence'
import AllMeeting from './AllMeeting'
import AllBreak from './AllBreak'
import AllProject from './AllProject'

interface BoxProps {
  icon: JSX.Element
  title: string
  count: number | string
  onClick: () => void
}

const DashboardBox: React.FC<BoxProps> = ({ icon, title, count, onClick }) => (
  <div
    className='bg-white shadow-md rounded-lg flex flex-col items-center justify-center p-6 border border-gray-200 w-64 cursor-pointer hover:shadow-lg transition-shadow'
    onClick={onClick}
  >
    <div className='text-red-600 mb-4'>{icon}</div>
    <h2 className='text-xl font-semibold mb-2'>{title}</h2>
    <p className='text-3xl font-bold'>{count}</p>
  </div>
)

const Dashboard: React.FC = () => {
  const [admin] = useRecoilState(adminState)
  const [activeComponent, setActiveComponent] =
    useState<string>('AttendenceUpdate')

  const boxesData = [
    {
      icon: <FaUserAlt size={40} />,
      title: 'Attendance Status',
      count: admin.AttendenceBox.count,
      component: 'AttendenceUpdate'
    },
    {
      icon: <FaClock size={40} />,
      title: 'Meeting Status',
      count: admin.MeetingBox.count,
      component: 'MeetingUpdate'
    },
    {
      icon: <FaProjectDiagram size={40} />,
      title: 'Break Status',
      count: admin.BreakBox.count,
      component: 'BreakUpdate'
    },
    {
      icon: <FaTasks size={40} />,
      title: 'Project Status',
      count: admin.projectBox.count,
      component: 'ProjectUpdate'
    }
  ]

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'AttendenceUpdate':
        return <AllAttendence />
      case 'MeetingUpdate':
        return <AllMeeting />
      case 'BreakUpdate':
        return <AllBreak />
      case 'ProjectUpdate':
        return <AllProject />
      default:
        return <AllAttendence />
    }
  }

  return (
    <div className='pl-4 pt-3'>
      {/* Render the boxes in a row */}
      <div className='grid grid-cols-4 gap-5 mb-5'>
        {boxesData.map((box, index) => (
          <DashboardBox
            key={index}
            icon={box.icon}
            title={box.title}
            count={box.count}
            onClick={() => setActiveComponent(box.component)}
          />
        ))}
      </div>

      {/* Render the active component */}
      <div className='mt-6 '>{renderActiveComponent()}</div>
    </div>
  )
}

export default Dashboard
