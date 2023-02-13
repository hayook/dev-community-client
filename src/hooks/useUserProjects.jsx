import { useQuery } from "react-query";
import { getUserProjects } from '../app/api'


export default function useUserProjects(userId) {
    return useQuery([`get-user-${userId}-posts`], () => getUserProjects(userId), {
        onSuccess: res => console.log(res)
    })
}