import { useQuery } from 'react-query';
import { getPosts } from '../../../../../app/api'
import Spinner from '../../../../../components/spinner/Spinner'
import Post from './Post';
import { useGlobalState } from '../../../../../app/GlobalStateProvider'
import { ACTIONS } from '../../../../../app/actions';
import { useEffect} from 'react'

export default function Posts() {

    const { dispatch } = useGlobalState();

    const response = useQuery(['get-posts'], getPosts, {
        cacheTime: 300000,
        staleTime: 2000, // start counting when the data is cached 
        //refetchOnMount: true,
        //refetchOnWindowFocus: 'always', // 'always' even if the data is fresh refetch it
    });

    if (response.isLoading) return <Spinner dim='30px' />
    if (response.error) return <h1>Error</h1>
    if (Object.keys(response.data).length === 0) return <h3>No Posts</h3>

    return (
            response.data.map((post, idx) => {
                let { userId: postOwnerId, id: postId, title, body, nbrLikes } = post;
                postOwnerId = Number(postOwnerId);
                return <Post key={idx} postOwnerId={postOwnerId} postId={postId} nbrLikes={nbrLikes} body={`${title}\n${body}`} />
            })
            

    )
}