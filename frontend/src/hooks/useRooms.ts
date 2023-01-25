import { useQuery } from 'react-query'
import { getRooms } from '../services/api'
import { useAuthContext } from './useAuth'
import useRoomStore from '../stores/useRoomStore'

export const useRooms = () => {
    const { token } = useAuthContext()

    const { rooms, currentRoom, setRoom, setRooms } = useRoomStore()

    const { isLoading, error } = useQuery(
        'rooms', () => getRooms(token),
        { onSuccess: data => setRooms(data) }
    )

    return { rooms, currentRoom, setRoom, isLoading, error }
}