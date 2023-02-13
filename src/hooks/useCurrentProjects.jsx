import { useQuery } from "react-query";
import useCurrentUserData from './useCurrentUserData'
import { getUserProjects } from '../app/api'


export default function useCurrentProjects() {

    const { currentUserId: userId } = useCurrentUserData()

    return useQuery([`get-user${userId}-current-projects`], () => getUserProjects(userId))
}