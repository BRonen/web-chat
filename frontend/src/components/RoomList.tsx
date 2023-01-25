import { useState } from 'react'
import { useRooms } from '../hooks/useRooms'

interface RoomCardProps {
    isCurrent: boolean
    room: any
    onClick: () => void
}

function RoomCard({ isCurrent, room, onClick }: RoomCardProps) {
    return(
        <button onClick={onClick} style={isCurrent? {
            border: '1px solid red'
        } : undefined}>
            <h3>{room.name}</h3>
            <p>{room.createdAt}</p>
        </button>
    )
}

function RoomList() {
    const { rooms, currentRoom, setRoom, isLoading, error } = useRooms()

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>{error.toString()}</p>

    if (!rooms || rooms?.length === 0) return <p>No data found</p>

    return(
        <nav className="flex flex-col gap-5">
            {rooms.map(
                (room: any, idx: number) => 
                    <RoomCard
                        key={room.id}
                        room={room}
                        isCurrent={idx === currentRoom}
                        onClick={() => setRoom(idx)}
                    />
            )}
        </nav>
    )
}

export default RoomList