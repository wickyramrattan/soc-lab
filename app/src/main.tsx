import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#0f1629',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          color: '#fff',
        },
      }}
    />
  </StrictMode>,
)
