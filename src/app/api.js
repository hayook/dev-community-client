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


// Users
export const authUser = async ({ endpoint, body, content }) => {
    const response = await fetch(`${api.url}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': content.type },
        body: content.parser(body),
    });
    try {
        return ({ ok: response.ok, status: response.status, data: await response.json() });
    } catch {
        return ({ ok: response.ok, status: response.status });
    }
}

export const updateUserInfo = async (body) => api.put(`/userprofile`, body);

// Posts
export const sharePost = async (body) => api.post('/posts', body);
export const likePost = (postId) => api.post(`/postlike/${postId}`);
export const commentOnPost = ({ body, postId }) => api.post(`/posts/${postId}/comments`, body);
export const likeComment = ({ commentId, postId }) => api.post(`/posts/${postId}/likecomment/${commentId}`);
export const editPost = ({ newPost, postId }) => api.put(`/posts/${postId}`, newPost);
export const editComment = ({ newBody, postId, commentId }) => api.put(`/posts/${postId}/comments/${commentId}`, { comment_body: newBody });
export const deleteComment = ({ commentId, postId }) => api.delete(`/posts/${postId}/likecomment/${commentId}`);
export const deletePost = async (postId) => api.delete(`/posts/${postId}`);

export const getUserPosts = async (userId) => api.get(`/user/${userId}/posts?type=post`);
export const getUserQuestions = async (userId) => api.get(`/user/${userId}/posts?type=question`)
export const getUserProjects = async (userId) => api.get(`/user/${userId}/projects`)


// Projects
export const createProject = (projectInfo) => api.post('/projects', projectInfo)
export const createTeam = ({ team, projectId }) => api.post(`/projects/${projectId}/teams`, team);
export const inviteMember = ({ projectId, newMember }) => api.post(`/projects/${projectId}/invites`, newMember);
export const acceptInvite = (inviteId) => api.post(`/user/invites/${inviteId}`);
export const rejectInvite = (inviteId) => api.delete(`/user/invites/${inviteId}`);
export const addToTeam = ({ projectId, teamId, memberId }) => api.post(`/projects/${projectId}/teams/${teamId}/members?member_id=${memberId}`)
export const removeProjectMember = ({ projectId, memberId }) => api.delete(`/projects/${projectId}/members/${memberId}`)
export const removeProjectTeam = ({ projectId, teamId }) => api.delete(`/projects/${projectId}/teams/${teamId}`)
export const removeTeamMember = ({ projectId, teamId, memberId }) => api.delete(`/projects/${projectId}/teams/${teamId}/members/${memberId}`)
export const removeProject = ({ projectId }) => api.delete(`/projects/${projectId}`)
export const editProject = ({ projectId, project }) => api.put(`/projects/${projectId}`, project)
export const cancelInvite = ({ inviteId, projectId }) => api.delete(`/projects/${projectId}/invites/${inviteId}`);



export const uploadImage = async (body) => {
    const response = await fetch(`http://localhost:3000/user_profile_img`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body,
    })
    try {
        return ({ ok: response.ok, status: response.status, data: await response.json() })
    } catch {
        return ({ ok: response.ok, status: response.status })
    }
}

// Tasks
export const getMemberTasks = async projectId => api.get(`/projects/${projectId}/task`);
export const postTask = async ({ projectId, task }) => api.post(`/projects/${projectId}/task`, task)
export const getProjectTasks = async projectId => api.get(`/projects/${projectId}/alltasks`);