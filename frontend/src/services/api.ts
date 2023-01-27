const API = 'http://localhost:5000/'

export const getMessages = async (token: string | null, roomId?: number) => {
  if (!token) throw new Error('Invalid authentication token')
  if (!roomId) return { messages: [] }

  const response = await fetch(`${API}/api/rooms/${roomId}/messages`, {
    headers: { 'Authorization': token },
  })

  const { messages } = await response.json()
  return { messages }
}

export const getRooms = async (token: string | null) => {
  if (!token) throw new Error('Invalid authentication token')

  const response = await fetch(`${API}/api/rooms`, {
    headers: { 'Authorization': token! },
  })

  const { rooms } = await response.json()
  return rooms
}

interface Message {
  name: string
  password: string
}

export const createRoom = async (room: Message, token: string) => {
  const response = await fetch(`${API}/api/rooms`, {
    method: 'POST',
    headers: {
      'Authorization': token!,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(room)
  })

  const data = await response.json()
  return data
}

export const createToken = async (userDataParsed: any) => {
  const response = await fetch(`${API}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDataParsed),
  })

  const { token } = await response.json()
  return token
}

export const createUser = async (userDataParsed: any) => {
  const response = await fetch(`${API}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDataParsed),
  })

  const { message, user } = await response.json()
  return { message, user }
}