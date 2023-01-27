import { FormEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useAuthContext } from '../../hooks/useAuth'
import { createRoom } from '../../services/api'
import FormField from './FormField'

interface NewRoomFormProps {
    onSubmit: () => void
}

function NewRoomForm({ onSubmit }: NewRoomFormProps) {
    const { token } = useAuthContext()

    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)

        const roomData = {
            name: data.get('name'),
            password: data.get('password'),
        }

        const schema = z.object({
            name: z.string(),
            password: z.string(),
        })

        try {
            const roomDataParsed = schema.parse(roomData)

            await createRoom(roomDataParsed, token!)

            onSubmit()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={submitHandler}
            className="w-1/2 flex flex-col gap-5 pt-[20vh] mx-auto">

            <h1 className="text-xl">Creating a new room</h1>

            <FormField name="name" label="Name:" type="text" />
            <FormField name="password" label="Password:" type="text" />

            <button className="duration-500 hover:shadow-xl p-2 text-lg border rounded">Create</button>

            <Link to="/"><p className="text-center text-xs underline">don't want to create a new room</p></Link>
        </form>
    )
}

export default NewRoomForm