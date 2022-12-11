const apiUrl = 'http://localhost:3000'

// Register 
export const authUser = async (config) => {
    const response = await fetch(`${apiUrl}${config.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': config.json ? 'application/json' : 'application/x-www-form-urlencoded' },
        body: config.json ? JSON.stringify(config.body) : new URLSearchParams(config.body),
    });
    return ({ ok: response.ok, status: response.status, data: await response.json() })
}


// fetch the current user info
export const getCurrentUser = async () => {
    try {
        const { token } = localStorage;
        const response = await fetch(`${apiUrl}/userprofile`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return { ok: response.ok, status: response.status, data: await response.json() }
    } catch (err) {
        return { error: err };
    }

}

// fetch all posts 
export const getPosts = async () => {
    try {
        const { token } = localStorage;
        const response = await fetch(`${apiUrl}/posts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return { ok: response.ok, status: response.status, data: await response.json() }
    } catch (err) {
        return { error: err };
    }
}

// Share Post
export const sharePost = async (body) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })
    return { ok: response.ok, status: response.status, data: await response.json() };

}

export const deletePost = async (postId) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    try {
        return { ok: response.ok, status: response.status, data: await response.json() }
    } catch { // + check for the data before the error
        return { ok: response.ok, status: response.status }
    }
}


export const editPost = async ({ newBody, postId }) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_body: newBody, post_type: 'post' })
    });
    return { ok: response.ok, status: response.status, data: await response.json() };
}

export const likePost = async (postId) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/postlike/${postId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return { ok: response.ok, status: response.status };
}

export const getPostComments = async (postId) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/posts/${postId}/comments`, { headers: { 'Authorization': `Bearer ${token}` } });
    return { ok: response.ok, status: response.status, data: await response.json() };
}

export const commentOnPost = async ({ comment: commentBody, postId }) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ comment_body: commentBody })
    });
    return { ok: response.ok, status: response.status, data: await response.json() };
}

export const likeComment = async ({ commentId, postId }) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/posts/${postId}/likecomment/${commentId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    return { ok: response.ok, status: response.status };
}

export const deleteComment = async ({ commentId, postId }) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/posts/${postId}/likecomment/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    try {
        return { ok: response.ok, status: response.status, data: await response.json() }
    } catch {
        return { ok: response.ok, status: response.status }
    }
}

export const editComment = async ({ newBody, postId, commentId }) => {
    const { token } = localStorage;
    const response = await fetch(`${apiUrl}/posts/${postId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment_body: newBody })
    });
    return { ok: response.ok, status: response.status, data: await response.json() };
}