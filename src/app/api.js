export const requestContents = {
    json: {
        type: 'application/json',
        parser: (body) => JSON.stringify(body),
    },
    urlencoded: {
        type: 'application/x-www-form-urlencoded',
        parser: (body) => new URLSearchParams(body),
    }
}

export const api = {
    url: 'http://localhost:3000',
    get: async (endpoint) => {
        const { token } = localStorage;
        const response = await fetch(`${api.url}${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        try {
            return { ok: response.ok, status: response.status, data: await response.json() }
        } catch {
            return { ok: response.ok, status: response.status }
        }
    },
    post: async (endpoint, body, content = requestContents.json) => {
        const { token } = localStorage;
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        if (body) {
            config.headers = { ...config.headers, 'Content-Type': content.type };
            config.body = content.parser(body);
        }
        const response = await fetch(`${api.url}${endpoint}`, {
            method: 'POST',
            headers: config.headers,
            body: config.body,
        });
        try {
            return { ok: response.ok, status: response.status, data: await response.json() }
        } catch {
            return { ok: response.ok, status: response.status }
        }
    },
    put: async (endpoint, body, content = requestContents.json) => {
        const { token } = localStorage;
        const response = await fetch(`${api.url}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': content.type,
                'Authorization': `Bearer ${token}`
            },
            body: content.parser(body),
        });
        try {
            return { ok: response.ok, status: response.status, data: await response.json() }
        } catch {
            return { ok: response.ok, status: response.status }
        }
    },
    delete: async (endpoint) => {
        const { token } = localStorage;
        const response = await fetch(`${api.url}${endpoint}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        try {
            return { ok: response.ok, status: response.status, data: await response.json() }
        } catch {
            return { ok: response.ok, status: response.status }
        }
    },
}



export const sharePost = async (body) => api.post('/posts', body);
export const likePost = (postId) => api.post(`/postlike/${postId}`);
export const commentOnPost = ({ body, postId }) => api.post(`/posts/${postId}/comments`, body);
export const likeComment = ({ commentId, postId }) => api.post(`/posts/${postId}/likecomment/${commentId}`);
export const editPost = ({ newBody, postId }) => api.put(`/posts/${postId}`, { post_body: newBody, post_type: 'post' });
export const editComment = ({ newBody, postId, commentId }) => api.put(`/posts/${postId}/comments/${commentId}`, { comment_body: newBody });
export const deleteComment = ({ commentId, postId }) => api.delete(`/posts/${postId}/likecomment/${commentId}`);
export const deletePost = async (postId) => api.delete(`/posts/${postId}`);

// Register 
export const authUser = async ({ endpoint, body }) => {
    const response = await fetch(`${api.url}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body),
    });
    try {
        return ({ ok: response.ok, status: response.status, data: await response.json() });
    } catch {
        return ({ ok: response.ok, status: response.status });
    }
}
