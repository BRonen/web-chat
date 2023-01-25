import { FormEventHandler, useRef } from 'react'
import { Link } from 'react-router-dom'
import { z, ZodError } from 'zod'
import { useAuthContext } from '../../hooks/useAuth'
import { createToken } from '../../services/api'
import { EMAIL_REGEX } from '../../constants/regex'
import FormField from './FormField'

interface SignInFormProps { }

function SignInForm() {
    const { setToken } = useAuthContext()
    const formRef = useRef<HTMLFormElement>(null)

    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)

        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        }

        const schema = z.object({
            email: z.string().regex(EMAIL_REGEX, 'Invalid email value'),
            password: z.string().min(6, 'Passwords need to have at least 6 characters'),
        })

        try {
            const userDataParsed = schema.parse(userData)

            const token = await createToken(userDataParsed)

            if (!token) throw new Error('User not found')

            setToken(token)
        } catch (e) {
            if (e instanceof ZodError) {
                for (const validationError of e.errors)
                    console.error(validationError)
            }
        }
    }

    return (
        <form ref={formRef} onSubmit={submitHandler}
            className="w-1/2 h-screen flex flex-col gap-5 mt-[20vh] mx-auto">

            <h1 className="text-xl">Sign In</h1>

            <FormField label="Email:" name="email" type="email" />
            <FormField label="Password:" name="password" type="password" />

            <button className="duration-500 hover:shadow-xl p-2 text-lg border rounded">Enter</button>

            <Link to="/sign-up"><p className="text-center text-xs underline">Create a new account</p></Link>
        </form>
    )
}

export default SignInForm