import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthWrapper from './AuthWrapper'
import routes from './routes'

import './index.css'

const queryClient = new QueryClient()
const rootContainer = document.getElementById('root')

if(!rootContainer) throw new Error('Root container not found')

const root = ReactDOM.createRoot(rootContainer)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <RouterProvider router={routes} />
      </AuthWrapper>
    </QueryClientProvider>
  </StrictMode>,
)
