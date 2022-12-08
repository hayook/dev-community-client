import jwt from 'jwt-decode';

// const api = 'https://jsonplaceholder.typicode.com';
const api = 'http://localhost:3000';

const headers = { 'Content-Type': 'application/json' };

// GET
export const getCurrentUser = async (token) => {
    const userId = jwt(token).user_id;
    const response = await fetch(`http://localhost:2000/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,

        }
    }); 
    
    if (response.status === 401) {
        console.log('Unauthorized'); 
    } else {
        return await response.json();
    }
}

export const getPosts = ({ pageParam = 1}) => fetch(`${api}/posts?_page=${pageParam}&_limit=10`).then(res => res.json()); 
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
