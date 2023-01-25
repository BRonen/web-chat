import { ReactNode, useContext, useState } from 'react'
import { authContext } from './hooks/useAuth'

interface AuthWrapperProps {
    children: ReactNode
}

function AuthWrapper({children}: AuthWrapperProps) {
    const context = useContext(authContext)
    const [token, setToken] = useState<string | null>(context.token)
    
    return <authContext.Provider value={{token, setToken}}>{children}</authContext.Provider>
}

export default AuthWrapper