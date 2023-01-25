import { createBrowserRouter } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NewRoom from './pages/NewRoom'
import App from './pages'

const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn/>,
  },
  {
    path: '/sign-up',
    element: <SignUp/>,
  },
  {
    path: '/rooms/new',
    element: <NewRoom/>,
  },
  {
    path: '/*',
    element: <App/>,
  },
])

export default router