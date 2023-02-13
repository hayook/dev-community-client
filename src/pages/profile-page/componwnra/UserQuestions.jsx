import { useParams } from "react-router-dom"
import useUserQuestions from "../../../hooks/useUserQuestions"
import Question from '../../questions-page/components/Question'
import { handleDate } from '../../../utiles/handle-date'
import Spinner from "../../components/spinner/Spinner"

export default function UserQuestions() {

    const { id: userId } = useParams()
    const { isLoading, data: response, error } = useUserQuestions(userId)

    if (isLoading) return <Spinner dim='30px' />
    if (response?.ok && 'data' in response) {
        if (!response?.data?.length) return <p style={{ marginInline: 'auto' }} >No Questions</p>
        return (
            response.data.map(question => {
                return <Question
                    key={question.post_id}
                    questionOwnerId={question.post_owner_id}
                    questionOwnerUsername={question.username}
                    questionDate={handleDate(question.post_creation_date)}
                    questionId={question.post_id}
                    nbrLikes={question.post_number_likes}
                    nbrAnswers={question.post_number_comments}
                    questionTitle={question.post_title}
                    questionDescription={question.post_body}
                    questionCode={question.post_code}
                    liked={question.liked === 'true'}
                />
            })
        )
    }
    if (!response?.ok) return <h1>{response?.status}</h1>
    if (error) return <h1>Error [ error.message ]</h1>
}