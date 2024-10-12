import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from "react-redux"
import store from './redux/store.ts'
import { Toaster } from "react-hot-toast"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_ID } from './common/configurations.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { SocketProvider } from './context/socketContext.tsx'

console.log("🚀 ~ GOOGLE_ID:", GOOGLE_ID)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_REACT_APP_GOOGLE_ID}`}>
      <Toaster position="top-center"/>
      <SocketProvider>
      <App />
      </SocketProvider>
      </GoogleOAuthProvider>
      </ChakraProvider>
    </Provider>
   </React.StrictMode> 
)
