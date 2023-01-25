import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageList from '../components/MessageList'
import MessageSender from '../components/MessageSender'
import RoomList from '../components/RoomList'
import { useAuthContext } from '../hooks/useAuth'
import { getRooms } from '../services/api'
import useRoomStore from '../stores/useRoomStore'

interface AppProps { }

function App() {
  const navigate = useNavigate()
  const { token } = useAuthContext()
  const { setRooms } = useRoomStore()

  const loadRooms = async () => {
    const rooms = await getRooms(token!)
    setRooms(rooms)
  }

  useEffect(() => {
    if (!token) return navigate('/sign-in')

    loadRooms()
  }, [token])

  return (
    <main className="flex gap-12 h-screen">
      <RoomList />
      <section className="flex flex-col justify-between h-full w-full">
        <MessageList />
        <MessageSender />
      </section>
    </main>
  )
}

export default App