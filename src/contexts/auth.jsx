import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) ?? {})
  const [token, setToken] = useState(() => localStorage.getItem('token') ?? null)

  return (
    <AuthContext.Provider value={{
      token,
      setToken,
      user,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}
