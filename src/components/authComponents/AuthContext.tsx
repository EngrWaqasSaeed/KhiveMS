import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  role: string
  login: (role: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState('')

  const login = (userRole: string) => {
    setIsAuthenticated(true)
    setRole(userRole)
    localStorage.setItem('auth', 'true')
    localStorage.setItem('role', userRole)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setRole('')
    localStorage.removeItem('auth')
    localStorage.removeItem('role')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
