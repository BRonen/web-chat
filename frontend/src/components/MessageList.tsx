import { useQuery } from 'react-query'
import { useAuthContext } from '../hooks/useAuth'
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
            <p>{author.name}: {content} - {createdAt}</p>
        </div>
    )
}

interface MessageListProps { }

function MessageList() {
    const { token } = useAuthContext()
    
    const { rooms, currentRoom } = useRoomStore()
    const room = rooms && rooms[currentRoom]

    const { error, isLoading, data } = useQuery(
        ['room', room?.id],
        () => getMessages(token, room?.id),
    )

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>{error.toString() || 'No data found'}</p>

    if (!data || data.messages.length === 0) return <p>Data not found</p>

    return (
        <div className="flex flex-col gap-3 overflow-scroll h-full">
            {data.messages.map(MessageCard)}
        </div>
    )
}

export default MessageList