import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.jsx'
import { Provider } from 'react-redux'
import {  store } from './redux/store.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/authContext.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <ToastContainer 
  position="top-right" 
  autoClose={3000} 
  hideProgressBar
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
<AuthProvider>

    <AppRouter />
    </AuthProvider>
    <ToastContainer />
  </Provider>
)
