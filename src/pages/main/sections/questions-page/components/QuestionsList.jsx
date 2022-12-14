import Spinner from '../../../../../components/spinner/Spinner'
import useQuestions from '../../../../../hooks/useQuestions'
import Question from './Question';
import { handleDate } from '../../../../../utiles/handle-date'

export default function QuestionsList() {

    const { isLoading, error, data:response } = useQuestions();

    if (isLoading) return <Spinner dim='30px' />
    if (error) return <h4>Error {error.message}</h4>
    if (response.status === 200 && response.data.length === 0) return <h4>No Questions Yet</h4>

    return (
        response.data.map(question => { 
            return (
                <Question 
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
            )
        })
    )
}