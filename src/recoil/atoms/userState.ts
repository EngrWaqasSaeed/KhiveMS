import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: {
    allUsers: [
      {
        name: 'Waqas',
        email: 'abc@gmail.com',
        cnic: '31312-3232323-2',
        post: '9:00 AM',
        joining_date: '2025-01-20',
        date_of_birth: '2002-01-18',
        date: '2002-01-18',
        checkin: '2002-01-18',
        checkout: '2002-01-18',
        status: 'remote',
        point: 10
      },
      {
        name: 'Maheen',
        email: 'abc@gmail.com',
        cnic: '31312-3232323-2',
        post: '9:00 AM',
        joining_date: '2025-01-20',
        date_of_birth: '2002-01-18'
      },
      {
        name: 'Huzaifa',
        email: 'abc@gmail.com',
        cnic: '31312-3232323-2',
        post: '9:00 AM',
        joining_date: '2025-01-20',
        date_of_birth: '2002-01-18'
      },
      {
        name: 'Sara',
        email: 'abc@gmail.com',
        cnic: '31312-3232323-2',
        post: '9:00 AM',
        joining_date: '2025-01-20',
        date_of_birth: '2002-01-18'
      },
      {
        name: 'Moneeba',
        email: 'abc@gmail.com',
        cnic: '31312-3232323-2',
        post: '9:00 AM',
        joining_date: '2025-01-20',
        date_of_birth: '2002-01-18'
      },
      {
        name: 'Yumna',
        email: 'abc@gmail.com',
        cnic: '31312-3232323-2',
        post: '9:00 AM',
        joining_date: '2025-01-20',
        date_of_birth: '2002-01-18'
      },
      {
        name: 'Jaweria',
        email: 'awais@gmail.com',
        cnic: '32323-3232323-3',
        post: '10:00 AM',
        joining_date: '2025-01-18',
        date_of_birth: '2000-05-10'
      }
    ]
  }
})
