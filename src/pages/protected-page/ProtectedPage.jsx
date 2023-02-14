import NotFoundPage from "../not-found-page/NotFoundPage"
import { useParams } from 'react-router-dom'
import useCurrentUserData from "../../hooks/useCurrentUserData"

export default function ProtectedPage({ children }) {

    const { id } = useParams()
    const { currentUserId } = useCurrentUserData()

    if (currentUserId === Number(id)) return children
    return <NotFoundPage /> 
}