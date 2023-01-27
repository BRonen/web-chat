import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MessageList from '../components/MessageList'
import MessageSender from '../components/MessageSender'
import RoomList from '../components/RoomList'
import { useAuthContext } from '../hooks/useAuth'
import { getRooms } from '../services/api'
import useRoomStore from '../stores/useRoomStore'

interface AppProps { }

function App() {
  const navigate = useNavigate()
  const { token, setToken } = useAuthContext()
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
      <div className="flex flex-col gap-5 text-center">
        <Link to="/rooms/new">New Room</Link>
        <RoomList />
        <button onClick={() => setToken(null)}>Logout</button>
      </div>
      <section className="flex flex-col justify-between h-full w-full">
        <MessageList />
        <MessageSender />
      </section>
    </main>
  )
}

export default App