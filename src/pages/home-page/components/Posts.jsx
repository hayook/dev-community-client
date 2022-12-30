import Spinner from '../../components/spinner/Spinner'
import Post from './Post';
import { handleDate } from '../../../utiles/handle-date';
import usePosts from '../../../hooks/usePosts';


export default function Posts() {

    const { isLoading, error, data:response } = usePosts()
    
    if (isLoading) return <Spinner dim='30px' />
    if (!!error) return <h1>Error { error.message }</h1>
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