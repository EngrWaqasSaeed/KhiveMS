import { atom } from 'recoil'

export const adminState = atom({
  key: 'adminState', // Unique ID for the atom
  default: {
    adminDetails: {
      name: 'Raziya admin',
      imageUrl: '',
      post: 'Adminsitator',
      role: 'admin'
    },
    AttendenceBox: {
      title: 'Total Attendence',
      count: '120'
    },
    MeetingBox: {
      title: 'Meeting Members',
      count: 120
    },
    BreakBox: {
      title: 'Break',
      count: 60
    },
    projectBox: {
      title: 'Total Projects',
      count: 12
    }
  }
})
