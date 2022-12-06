// const api = 'https://jsonplaceholder.typicode.com';
const api = 'http://localhost:3000';

const headers = { 'Content-Type': 'application/json' };

// GET
export const getCurrentUser = () => fetch(`${api}/users/5173`).then(res => res.json());
export const getPosts = () => fetch(`${api}/posts`).then(res => res.json()); 
export const getPostComments = (postId) => () => fetch(`${api}/posts/${postId}/comments`).then(res => res.json());
export const getQuestions = () => fetch(`${api}/posts?type=Question`).then(res => res.json());

// POST
export const POSTPost = async (reqBody) => {
    const response = await fetch(`${api}/posts`, { method: 'POST', headers, body: JSON.stringify(reqBody)});
    return response;
}

export const DELETEPost = async (postId) => {
    const response = await fetch(`${api}/posts/${postId}`, { method: 'DELETE'});
    return response; 
} 
