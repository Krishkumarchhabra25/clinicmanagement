import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.jsx'
import { Provider } from 'react-redux'
import {  store } from './redux/store.js'
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/authContext.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>

 
<AuthProvider>

    <AppRouter />
    <Toaster />

    </AuthProvider>

  </Provider>
)
