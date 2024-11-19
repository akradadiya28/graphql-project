import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClientProvider } from './apollo-client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloClientProvider>
      <App />
    </ApolloClientProvider>
  </StrictMode>,
)
