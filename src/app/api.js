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
    return { ok: response.ok, status: response.status };
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