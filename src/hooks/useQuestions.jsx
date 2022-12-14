import { useQuery } from "react-query";
import { api } from '../app/api'

const getQuestions = () => api.get('/posts?type=question');

export default function useQuestions() {
    return useQuery(['get-questions'], getQuestions);
}