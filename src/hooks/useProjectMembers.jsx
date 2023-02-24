import { useQuery } from "react-query";
import { api } from '../app/api'

const getProjectMembers = (projectId) => api.get(`/projects/${projectId}/members`);

export default function useProjectMembers(projectId) {
    return useQuery([`get-project-${projectId}-members`], () => getProjectMembers(projectId), {
        // onSuccess: res => console.log(res)
    })
}