import { atom } from 'recoil'

interface checkinState {
  userId: number // ID of the user
  date: Date // Date of the check-in (Date object)
  checkin: number // Time of the check-in (timestamp or hours)
  todayTask: string // Task for the day
  workStatus: string // Work status
  setIsCheckedIn: boolean
}

export const checkinState = atom<checkinState | null>({
  key: 'checkinState',
  default: null
})
