import { useQuery } from "react-query";
import { api } from '../app/api'

const getAllInvites = (projectId) => api.get(`/projects/${projectId}/invites`)

export default function useProjectInvites(projectId) {
    return useQuery([`get-project-${projectId}-invites`], () => getAllInvites(projectId))
}