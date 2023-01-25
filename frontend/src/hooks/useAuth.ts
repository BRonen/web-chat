import { createContext, useContext } from 'react'

interface AuthContext {
    token: string | null,
    setToken: (token: string | null) => void,
}

export const authContext = createContext<AuthContext>({
    token: localStorage.getItem('token'),
    setToken: () => {},
})

export const useAuthContext = () => {
    const context = useContext(authContext)

    return {
        token: context.token? `Bearer ${context.token}` : null,
        setToken: (token: string | null) => {
            if(token) localStorage.setItem('token', token)
            context.setToken(token)
        },
    }
}