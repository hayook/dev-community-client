import { useQuery } from "react-query"
import { getUserPosts } from "../app/api"

export default function useUserPosts(userId) {
    return useQuery([`get-user-${userId}-posts`], getUserPosts)
}