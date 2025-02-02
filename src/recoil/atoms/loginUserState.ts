import { atom } from 'recoil'

interface loginUserState {
  name: string
  email: string
}

export const loginUserState = atom<loginUserState | null>({
  key: 'loginUserState',
  default: null
})
