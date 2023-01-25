import { FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuthContext } from '../hooks/useAuth'
import { createRoom } from '../services/api'

interface NewRoomProps { }

function NewRoom() {
    const navigate = useNavigate()
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

            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input name="name" type="text" placeholder="name..." />
            <input name="password" type="text" placeholder="password..." />
            <button>Create</button>
        </form>
    )
}

export default NewRoom