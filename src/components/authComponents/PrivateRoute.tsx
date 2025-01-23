import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

const PrivateRoute: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles
}) => {
  const auth = useAuth()

  if (!auth?.isAuthenticated) {
    return <Navigate to='/sign' />
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to='/unauthorized' />
  }

  return <Outlet />
}

export default PrivateRoute
