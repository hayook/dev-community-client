import Spinner from '../../components/spinner/Spinner'
import Post from './Post';
import { handleDate } from '../../../lib/date';
import usePosts from '../../../hooks/usePosts';
import NetworkError from '../../components/network-error/NetworkError'


export default function Posts() {

    const { isLoading, error, data: response, refetch: refetchPosts } = usePosts()

    if (isLoading) return <Spinner dim='30px' />
    if (!!error) return <NetworkError refetch={refetchPosts} />
    if (response.status === 200 && response.data.length === 0) return <h3>No Posts</h3>
    return (
        response.data?.map(post => {
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