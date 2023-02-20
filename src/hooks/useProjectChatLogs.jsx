import { useQuery } from "react-query";
import { api } from '../app/api'

const getProjectChatLogn = (projectId) => api.get(`/projects/${projectId}/chat`)

export default function useProjectChatLogs(projectId) {
    return useQuery([`get-project-${projectId}-chat-logs`], () => getProjectChatLogn(projectId), {
        // onSuccess: res => console.log(res)
    })
}