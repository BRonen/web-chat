import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthContext } from './useAuth'

type EventListener = (e: any) => void

export const useSocketIO = (eventListeners: Record<string, EventListener>) => {
    const { token } = useAuthContext()
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isConnected, setIsConnected] = useState<Boolean>(Boolean(socket?.connect))

    useEffect(() => {
        if(socket) socket.disconnect()

        setSocket(
            token? io(import.meta.env.VITE_API_URL, { auth: { token } }) : null
        )
    }, [token])

    useEffect(() => {
        if(!socket) return

        socket.on('connect', () => {
            setIsConnected(true)
            console.log('connected')
        })

        socket.on('disconnect', () => {
            setIsConnected(false)
            console.log('disconnected')
        })

        socket.on('auth:error', console.log)

        for(const eventListener of Object.entries(eventListeners))
            socket.on(...eventListener)

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            for(const eventName of Object.keys(eventListeners))
                socket.off(eventName)
        }
    }, [socket])

    return { isConnected, socket }
}