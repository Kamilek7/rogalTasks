import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider} from 'react-cookie'
import './index.css'
import App from './App.jsx'
import { createContext } from "react";
export const backendLink = createContext();

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </CookiesProvider>
)
