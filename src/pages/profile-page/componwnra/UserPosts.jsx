import { useParams } from "react-router-dom"
import useUserPosts from "../../../hooks/useUserPosts"
import Spinner from "../../components/spinner/Spinner"
import Post from '../../home-page/components/Post'
import { handleDate } from "../../../utiles/handle-date"

export default function UserPosts() {

    const { id: userId } = useParams()
    const { isLoading, data: response, error } = useUserPosts(userId)

    if (isLoading) return <Spinner dim='30px' />
    if (response?.ok && 'data' in response) {
        if (!response?.data?.length) return <p style={{ marginInline: 'auto' }} >No Posts</p>
        return (
            response.data.map(post => {
                return <Post
                    key={post.post_id}
                    postOwnerId={post.post_owner_id}
                    postOwnerUsername={post.username}
                    postDate={handleDate(post.post_creation_date)}
                    postId={post.post_id}
                    nbrLikes={post.post_number_likes}
                    nbrComments={post.post_number_comments}
                    profileImg={post.img_url}
                    body={post.post_body}
                    liked={post.liked === 'true'}
                />
            })
        )
    }
    if (!response?.ok) return <h1>{response?.status}</h1>
    if (error) return <h1>Error [ error.message ]</h1>
}