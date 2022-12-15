import { QueryErrorResetBoundary, useQuery } from "react-query";
import { api } from '../app/api'

const getQuestionById = (questionId) => api.get(`/posts/${questionId}`)

export default function useQuestion(questionId, setQuestion) {
    return useQuery([`get-question-${questionId}`], () => getQuestionById(questionId), {
        onSuccess: res => {
            const question = res.data[0];
            setQuestion({ ...question, liked: question.liked === 'true'});
        },
        onError: (err) => console.log('Error', err)
    })
}