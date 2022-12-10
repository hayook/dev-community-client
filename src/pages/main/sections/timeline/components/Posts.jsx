import Spinner from '../../../../../components/spinner/Spinner'
import Post from './Post';
import { useQuery, useInfiniteQuery } from 'react-query'
import { getPosts } from '../../../../../app/api'
import { ACTIONS } from '../../../../../app/actions'
import { useGlobalState } from '../../../../../app/GlobalStateProvider';

export default function Posts() {

    const { dispatch, state } = useGlobalState();

    const { isLoading, error, data:response } = useQuery(['get-posts'], () => getPosts(), {
        onSuccess: (res) => {
            dispatch({ type: ACTIONS.SET_SERVER_ERROR, payload: false });
            if ('error' in res) {
                dispatch({ type: ACTIONS.SET_SERVER_ERROR, payload: true });
                return;
            }
        },
        onError: (err) => console.log('Error ' + err)
    });
    
    if (isLoading) return <Spinner dim='30px' />
    if (!!error) return <h1>Error { error.message }</h1>
    if (response.status === 200 && response.data.length === 0) return <h3>No Posts</h3>
    return (
        response.data?.map((post, idx) => {
            let {
                post_owner_id:postOwnerId, 
                post_id:postId, 
                post_body:body, 
                post_number_likes:nbrLikes, 
                post_type:type 
            } = post;
            if (type === 'post') return <Post key={idx} postOwnerId={postOwnerId} postId={postId} nbrLikes={nbrLikes} body={body} />
            // if (type === 'question') return <Question key={postId} body={body} id={postId} questionOwner={postOwnerId} nbrLikes={nbrLikes} />
        })

    )
}