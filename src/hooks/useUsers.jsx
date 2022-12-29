import { useQuery } from "react-query";
import { api } from '../app/api'

const getUsers = (projectId) => api.get(`/projects/${projectId}/allusertobeinvited`);

export default function useUsers(projectId, setRecommandedMembers) {
    return useQuery([`get-project-${projectId}-recommanded-users`], () => getUsers(projectId))
}