import { useQuery } from "react-query";
import { api } from '../app/api'

const getProjectById = (projectId) => api.get(`/projects/${projectId}`); 

export default function useProject(projectId) {
    return useQuery([`get-project-${projectId}`], () => getProjectById(projectId), {
        select: res => ({ ...res, data: res.data[0] }),
        onSuccess: res => console.log(res)
    });
}