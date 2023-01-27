import { FormEventHandler, useEffect, useRef } from 'react'
import { useAuthContext } from '../hooks/useAuth'
import { useSocketIO } from '../hooks/useSockerIO'
import useRoomStore from '../stores/useRoomStore'

interface MessageSenderProps { }

function MessageSender() {
    const formRef = useRef<HTMLFormElement>(null)
    const { token } = useAuthContext()
    const { rooms, currentRoom } = useRoomStore()
    const room = rooms && rooms[currentRoom]

    const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)

        const messageData = {
            content: data.get('content'),
        }

        try {
            const response = await fetch(`https://7dba-186-229-132-149.sa.ngrok.io/api/rooms/${room?.id}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': token!,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData)
            })
            const data = await response.json()

            console.log(data)

            formRef.current?.reset()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form ref={formRef} onSubmit={submitHandler} className="flex gap-2">
            <textarea name="content" className="w-4/5" />
            <button className="w-16 h-16 p-5">Enter</button>
        </form>
    )
}

export default MessageSender