const api = 'https://jsonplaceholder.typicode.com';
export const headers = { 'Content-Type': 'application/json' };

export const getPosts = () => fetch(`${api}/posts`).then(res => res.json()); 
export const getPostComments = (postId) => () => fetch(`${api}/posts/${postId}/comments`).then(res => res.json());
