import { useQuery } from "react-query";
import { getUserQuestions } from '../app/api'


export default function useUserQuestions(userId) {
    return useQuery([`get-user-${userId}-questions`], () => getUserQuestions(userId))
}