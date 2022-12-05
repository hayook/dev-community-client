import { useQuery } from 'react-query';
import { getPosts } from '../../../../../app/api'
import Spinner from '../../../../../components/spinner/Spinner'
import Post from './Post';

/* For Testing */

function genId() {
    let id = '';
    for (let i = 0; i < 2; i++) id += Math.trunc(Math.random() * 9);
    return id;
}

function genDate() {
    let date = ''
    let unit = ['m', 'h', 'd', 'w', 'mo', 'y'];
    date += unit[Math.trunc(Math.random() * (unit.length - 1))];
    switch (date) {
        case 'm': return ((Math.trunc(Math.random() * 58) + 1) + date)
        case 'h': return ((Math.trunc(Math.random() * 2) + 1) + date)
        case 'd': return ((Math.trunc(Math.random() * 5) + 1) + date)
        case 'w': return ((Math.trunc(Math.random() * 2) + 1) + date)
        case 'mo': return ((Math.trunc(Math.random() * 10) + 1) + date)
        case 'y': return ((Math.trunc(Math.random() * 2) + 1) + date)
    }
}

/* For Testing */

export default function Posts() {

    const response = useQuery(['get-posts'], getPosts, {
        cacheTime: 300000,
        staleTime: 0, // start counting when the data is cached 
        refetchOnMount: true,
        refetchOnWindowFocus: true, // 'always' even if the data is fresh refetch it 
        refetchInterval: false,
    });

    if (response.isLoading) return <Spinner dim='30px' />
    if (response.error) return <h1>Error</h1>
    if (Object.keys(response.data).length === 0) return <h3>No Posts</h3>
    return (
            response.data.map((post, idx) => {
                let { userId: postOwnerId, id: postId, title, body } = post;
                postOwnerId = Number(genId() + postOwnerId + genId());
                return <Post key={idx} postOwnerId={postOwnerId} postId={postId} body={`${title}\n${body}`} date={genDate()} />
            })
            

    )
}