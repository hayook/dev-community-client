import { useParams } from "react-router-dom"
import useUserPosts from "../../../hooks/useUserPosts"
import Spinner from "../../components/spinner/Spinner"

export default function UserPosts() {

    const { id:userId } = useParams()
    const { isLoading, data:response, error } = useUserPosts(userId)

    if (isLoading) return <Spinner dim='30px' />
    if (response?.ok && 'data' in response) {
        if (!response?.data?.length) return <p style={{ marginInline: 'auto' }} >No Posts</p>
        return <p>List of posts</p>
    }
    if (!response?.ok) return <h1>{response?.status}</h1>
    if (error) return <h1>Error [ error.message ]</h1>
}