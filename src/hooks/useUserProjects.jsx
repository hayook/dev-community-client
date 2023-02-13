import { useQuery } from "react-query";
import { getUserProjects } from '../app/api'


export default function useUserProjects(userId) {
    return useQuery([`get-user-${userId}-projects`], () => getUserProjects(userId))
}