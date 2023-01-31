import { FormEventHandler, useEffect, useRef } from 'react'
import { useAuthContext } from '../hooks/useAuth'
import { useSocketIO } from '../hooks/useSockerIO'
import { createMessage } from '../services/api'
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

        const messageData = { content: data.get('content') }

        try {
            if (!room) throw new Error('Invalid room id')

            await createMessage(token!, room?.id, messageData)

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