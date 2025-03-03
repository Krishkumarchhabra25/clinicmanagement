import { createContext, useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedAdmin = localStorage.getItem('admin');
  
        // Basic validation
        if (storedToken?.length > 10 && storedAdmin) { // Simple token length check
          setToken(storedToken);
          setAdmin(JSON.parse(storedAdmin));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.clear();
      }
      setLoading(false);
    };
    
    fetchUser();
  }, []);
  // Function to log in and store cookie data
  const login = (response) => {
    try {
      console.log("Checking response", response);
      const { token, admin } = response;
      console.log('token', token);
      console.log('admin', admin);
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      setToken(token);
      setAdmin(admin);
    } catch (error) {
      console.error('Error storing user/token to cookies:', error);
    }
  };

  // Function to log out and clear cookies
  const logout = () => {
    try {

  
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    } catch (error) {
      console.error('Error clearing user/token from cookies:', error);
    }
    setToken(null);
    setAdmin(null);
    
  };

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
