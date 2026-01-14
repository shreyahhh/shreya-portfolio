import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply dark mode class to html element (Neurazor style)
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark')
  document.documentElement.setAttribute('data-theme', 'dark')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
