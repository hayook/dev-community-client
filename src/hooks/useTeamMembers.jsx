import { useQuery } from 'react-query'
import { api } from '../app/api'

const getTeamMembers = (projectId, teamId) => api.get(`/projects/${projectId}/teams/${teamId}/members`)

export default function useTeamMembers(projectId, teamId) {
    return useQuery([`get-project-${projectId}-team-${teamId}-members`], () => getTeamMembers(projectId, teamId), {
        onError: err => console.log(err)
    })
}