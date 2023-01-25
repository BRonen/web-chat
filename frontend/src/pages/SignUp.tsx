import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuth"
import SignUpForm from "../components/forms/SignUpForm"

interface SignUpProps { }

function SignUp() {
  const navigate = useNavigate()
  const { token } = useAuthContext()

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <SignUpForm />
  )
}

export default SignUp