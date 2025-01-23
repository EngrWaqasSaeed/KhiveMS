import Forget from './pages/auth/forget_password/Forget'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import Admin from './pages/admin_dashboard/Admin'
import { Routes, Route } from 'react-router-dom'
import User from './pages/user_dashboard/User'

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forget' element={<Forget />}></Route>
        <Route path='/admin/*' element={<Admin />}></Route>
        <Route path='/user/*' element={<User />}></Route>
      </Routes>
    </>
  )
}

export default App
