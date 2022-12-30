import { useQuery } from "react-query";
import useCurrentUserData from './useCurrentUserData'
import { api } from '../app/api'

const getCurrentProjects = () => api.get('/user/projects/'); 

export default function useCurrentProjects() {

    const { currentUserId } = useCurrentUserData()

    return useQuery([`get-user${currentUserId}-current-projects`], getCurrentProjects)
}