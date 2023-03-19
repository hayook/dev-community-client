import { QueryErrorResetBoundary, useQuery } from "react-query";
import { api } from '../app/api'

export const getQuestionById = (questionId) => api.get(`/posts/${questionId}`)

export default function useQuestion(questionId) {
    return useQuery([`get-question-${questionId}`], () => getQuestionById(questionId))
}