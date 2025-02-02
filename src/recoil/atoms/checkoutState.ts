import { atom } from 'recoil'

interface checkoutState {
  userId: number // ID of the user
  date: Date // Date of the check-in (Date object)
  checkout: number // Time of the check-in (timestamp or hours)
  dayReport: string // Task for the day
}

export const checkoutState = atom<checkoutState | null>({
  key: 'checkoutState',
  default: null
})
