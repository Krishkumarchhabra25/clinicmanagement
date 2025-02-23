import { createContext, useState, useEffect } from 'react'
import Cookie from 'js-cookie'

// Create the context
const AuthContext = createContext()

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [admin, setadmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = Cookie.get('token')
      const storedAdmin = Cookie.get('admin')
      console.log(storedAdmin,'storedAdmin');
      console.log(storedUser,'storedUser');
      if (storedUser&&storedAdmin) {
        setToken(storedUser)
        setadmin(JSON.parse(storedAdmin))
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  // Function to log in
  const login = response => {
    try {
      const userData = response

      Cookie.set('token', JSON.stringify(userData))

      setToken(userData)
    } catch (error) {
      console.error('Error storing user/token to cookies:', error)
    }
  }

  // Function to log out
  const logout = () => {
    try {
      Cookie.remove('token')
    } catch (error) {
      console.error('Error clearing user/token from cookies:', error)
    }
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, loading, login, logout,admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext