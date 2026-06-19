import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './css/style.css'
import App from './App.jsx'

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

if (!apiUrl) {
  throw new Error('La variable VITE_API_URL doit être définie')
}

axios.defaults.baseURL = apiUrl
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
