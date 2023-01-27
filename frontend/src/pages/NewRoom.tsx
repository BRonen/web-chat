import { useNavigate } from 'react-router-dom'
import NewRoomForm from '../components/forms/NewRoomForm'

interface NewRoomProps { }

function NewRoom() {
    const navigate = useNavigate()

    return (
        <NewRoomForm onSubmit={() => navigate('/')}/>
    )
}

export default NewRoom