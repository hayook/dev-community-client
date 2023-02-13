import { useParams } from "react-router-dom"
import useUserQuestions from "../../../hooks/useUserQuestions"
import Spinner from "../../components/spinner/Spinner"

export default function UserQuestions() {

    const { id:userId } = useParams()
    const { isLoading, data:response, error } = useUserQuestions(userId)

    if (isLoading) return <Spinner dim='30px' />
    if (response?.ok && 'data' in response) {
        if (!response?.data?.length) return <p style={{ marginInline: 'auto' }} >No Posts</p>
        return <p>List of questions</p>
    }
    if (!response?.ok) return <h1>{response?.status}</h1>
    if (error) return <h1>Error [ error.message ]</h1>
}