import { useQuery } from "react-query";
import { api } from '../app/api'

const getProjectTeams = (projectId) => api.get(`/projects/${projectId}/teams`);

export default function useProjectTeams(projectId) {
    return useQuery([`get-project-${projectId}-teams`], () => getProjectTeams(projectId))
}