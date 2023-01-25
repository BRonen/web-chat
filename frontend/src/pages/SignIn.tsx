import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuth'
import SignInForm from '../components/forms/SignInForm'

interface SignInProps { }

function SignIn() {
  const navigate = useNavigate()
  const { token } = useAuthContext()

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <SignInForm />
  )
}

export default SignIn