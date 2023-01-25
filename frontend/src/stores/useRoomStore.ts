import { create } from 'zustand'

export interface User {
    id: number
    name: string
    email: string
    verified: boolean
    createdAt: string
    updatedAt: string
    user_rooms: {
        createdAt: string
        updatedAt: string
        roomId: number
        userId: number
    }
}

export interface Room {
    id: number
    name: string
    password: string
    createdAt: string
    updatedAt: string
    users: User[]
    user_rooms: {
        createdAt: string
        updatedAt: string
        roomId: number
        userId: number
    }
}

interface RoomStore {
    rooms?: Room[]
    currentRoom: number
    setRooms: (rooms: Room[]) => void
    setRoom: (current: number) => void
}

const useRoomStore = create<RoomStore>((set) => ({
  rooms: undefined,
  currentRoom: 0,
  setRooms: (rooms) => set({rooms}),
  setRoom: (currentRoom) => set({currentRoom}),
}))

export default useRoomStore