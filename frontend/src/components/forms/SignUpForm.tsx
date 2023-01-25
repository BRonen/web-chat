import { FormEventHandler, useRef } from 'react'
import { z, ZodError } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuth'
import { createUser } from '../../services/api'
import { EMAIL_REGEX } from '../../constants/regex'
import FormField from './FormField'

interface SignUpProps { }

function SignUpForm() {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const { token } = useAuthContext()

    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)

        const userData = {
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
        }

        const schema = z.object({
            name: z.string().min(5, 'Nicknames need to have at least 6 characters'),
            email: z.string().regex(EMAIL_REGEX, 'Invalid email value'),
            password: z.string().min(6, 'Passwords need to have at least 6 characters'),
        })

        try {
            const userDataParsed = schema.parse(userData)

            const { user } = await createUser(userDataParsed)

            // TODO: implement email confirmation warning
            console.log(user)

            navigate('/sign-in')
        } catch (e) {
            if (e instanceof ZodError) {
                for (const validationError of e.errors)
                    console.error(validationError)
            }
            console.error(e)
        }
    }

    return (
        <form ref={formRef} onSubmit={submitHandler}
            className="w-1/2 h-screen flex flex-col gap-5 mt-[20vh] mx-auto">

            <h1 className="text-xl">Sign In</h1>

            <FormField label="Nickname:" name="name" type="text" />
            <FormField label="Email:" name="email" type="email" />
            <FormField label="Password:" name="password" type="password" />

            <button className="duration-500 hover:shadow-xl p-2 text-lg border rounded">Enter</button>

            <Link to="/sign-in"><p className="text-center text-xs underline">Already have an account</p></Link>
        </form>
    )
}

export default SignUpForm
