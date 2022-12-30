import { useQuery } from 'react-query';
import { getPosts } from '../app/api'

export function usePosts() {
    return useQuery(['get-posts'], getPosts, {
        //cacheTime: 300000,
        //staleTime: 2000, // start counting when the data is cached 
        //refetchOnWindowFocus: 'always', // 'always' even if the data is fresh refetch it
        select: (posts) => posts?.filter(post => post.type === 'Post'),
        onSuccess: () => console.log('Success'),
        onError: () => console.log('Error')
    });
}