import { useQuery } from "react-query";
import { useGlobalState } from '../app/GlobalStateProvider'
import { api } from '../app/api'

const getCurrentProjects = () => api.get('/user/projects/'); 

export default function useCurrentProjects() {

    const { user_id:userId } = useGlobalState().state.user;

    return useQuery([`get-user${userId}-current-projects`], getCurrentProjects)
}