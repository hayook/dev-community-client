import { useQuery } from 'react-query';
import { api } from '../app/api'

export const getPostComments = (postId) => api.get(`/posts/${postId}/comments`);

export default function usePostComments(postId) {

    return useQuery([`get-post-${postId}-comments`], () => getPostComments(postId), { 
        onError: err => console.log('Error ' + err)
    });
}