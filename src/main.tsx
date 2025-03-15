import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <AppRoutes />
      </Auth0ProviderWithNavigate>
    </Router>
  </React.StrictMode>,
)
