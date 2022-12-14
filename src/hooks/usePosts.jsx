import { useQuery } from 'react-query';
import { api } from '../app/api'

export const getPosts = () => api.get('/posts?type=post');

export default function usePosts()  {
    
    return useQuery(['get-posts'], getPosts, {
        refetchOnWindowFocus: true, 
        refetchOnMount: true,
        onError: (err) => console.log('Error ' + err)
    });
}