import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App.tsx'
import { theme } from './components/layout/theme'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
