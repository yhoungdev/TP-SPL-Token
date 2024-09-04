import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Buffer } from 'buffer';


if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
