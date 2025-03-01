import { createContext, useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      console.log("Checking cookies...", document.cookie);
      const storedToken = Cookie.get('token');
      const storedAdmin = Cookie.get('admin');
      console.log('storedToken',storedToken);
      console.log('storedAdmin',storedAdmin);
      if (storedToken && storedAdmin) {
        setToken(storedToken);
        setAdmin(JSON.parse(storedAdmin));
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
      Cookie.set('token', token, { path: '/', secure: true, sameSite: 'Strict' });
      Cookie.set('admin', JSON.stringify(admin), { path: '/', secure: true, sameSite: 'Strict' });
      setToken(token);
      setAdmin(admin);
    } catch (error) {
      console.error('Error storing user/token to cookies:', error);
    }
  };

  // Function to log out and clear cookies
  const logout = () => {
    try {
      Cookie.remove('token', { path: '/' });
      Cookie.remove('admin', { path: '/' });
  
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
