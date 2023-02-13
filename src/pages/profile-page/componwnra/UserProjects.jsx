import { useParams } from "react-router-dom"
import useUserProjects from "../../../hooks/useUserProjects"
import Spinner from "../../components/spinner/Spinner"

export default function UserProjects() {

    const { id:userId } = useParams()
    const { isLoading, data:response, error } = useUserProjects(userId)

    if (isLoading) return <Spinner dim='30px' />
    if (response?.ok && 'data' in response) {
        if (!response?.data?.length) return <p style={{ marginInline: 'auto' }} >No Projects</p>
        return <p>List of projects</p>
    }
    if (!response?.ok) return <h1>{response?.status}</h1>
    if (error) return <h1>Error [ error.message ]</h1>
}