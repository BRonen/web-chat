import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useAuthContext } from '../hooks/useAuth'
import { useSocketIO } from '../hooks/useSockerIO'
import { getMessages } from '../services/api'
import useRoomStore from '../stores/useRoomStore'

export interface Message {
    id: number
    content: string
    createdAt: string
    updatedAt: string
    userId: number
    roomId: number
    author: {
        id: number
        name: string
        email: string
        verified: boolean
        createdAt: string
        updatedAt: string
    }
}

function MessageCard({ id, author, content, createdAt }: Message) {
    return (
        <div key={id}>
            <p className="break-words px-5">{author.name}: {content} - {createdAt}</p>
        </div>
    )
}

interface MessageListProps { }

function MessageList() {
    const { token } = useAuthContext()

    const [newMessages, setNewMessages] = useState<Message[]>([])

    useSocketIO({
        'message:send': (message: Message) => {
            setNewMessages(state => [...state, message])
        }
    })

    const { rooms, currentRoom } = useRoomStore()
    const room = rooms && rooms[currentRoom]

    const { error, isLoading, data } = useQuery(
        ['room', room?.id],
        () => getMessages(token, room?.id),
        { onSuccess: () => setNewMessages([]) }
    )

    useEffect(() => setNewMessages([]), [currentRoom])

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>{error.toString() || 'No data found'}</p>

    if (newMessages.length === 0 && (!data || data.messages.length === 0)) return <p>Data not found</p>

    return (
        <div className="flex flex-col gap-3 overflow-scroll h-full">
            {data?.messages.map(MessageCard)}
            {newMessages.map(MessageCard)}
        </div>
    )
}

export default MessageList