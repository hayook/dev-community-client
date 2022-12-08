import Spinner from '../../../../../components/spinner/Spinner'
import Post from './Post';
import Question from '../../questions-page/components/Question'
import { usePosts } from '../../../../../app/query-hooks'
import { useState, useEffect } from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import { getPosts } from '../../../../../app/api'

export default function Posts() {

    useEffect(() => {
        const scrollEvent = () => {
            if (window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
                response.fetchNextPage();
                console.log('Load More...')
            }
        }
        window.addEventListener('scroll', scrollEvent);
        return () => window.removeEventListener('scroll', scrollEvent);
    }, []);

    // const response = useQuery(['get-posts'], getPosts, {
    //     //cacheTime: 300000,
    //     //staleTime: 2000, // start counting when the data is cached 
    //     //refetchOnWindowFocus: 'always', // 'always' even if the data is fresh refetch it
    //     select: (posts) => posts?.filter(post => post.type === 'Post'),
    //     onSuccess: () => console.log('Success'),
    //     onError: () => console.log('Error')
    // });
    const response = useInfiniteQuery(['get-posts'], getPosts, {
        getNextPageParam: (_, pages) => pages.length + 1,
    })

    if (response.isLoading) return <Spinner dim='30px' />
    if (response.error) return <h1>Error</h1>
    if (Object.keys(response.data).length === 0) return <h3>No Posts</h3>

    return (
        <>
            {
                response.data.pages.map((groupe, idx) => {
                    return groupe.map((post, idx) => {
                        let { userId: postOwnerId, id: postId, title, body, nbrLikes, type } = post;
                        if (type === 'Post') return <Post key={idx} postOwnerId={postOwnerId} postId={postId} nbrLikes={nbrLikes} body={`${title}\n${body}`} />
                        if (type === 'Question') return <Question key={postId} body={body} title={title} id={postId} questionOwner={postOwnerId} nbrLikes={nbrLikes} />
                    })
                })
            }
            {response.isFetchingNextPage && <Spinner dim='30px' />}
        </>

    )
}