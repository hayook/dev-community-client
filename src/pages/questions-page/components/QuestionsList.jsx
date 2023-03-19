import Spinner from '../../components/spinner/Spinner'
import useQuestions from '../../../hooks/useQuestions'
import Question from './Question';
import { handleDate } from '../../../lib/date'
import NetworkError from '../../components/network-error/NetworkError';

export default function QuestionsList() {

    const { isLoading, error, data: response, refetch: refetchQuestions } = useQuestions();

    if (isLoading) return <Spinner dim='30px' />
    if (error) return <NetworkError refetch={refetchQuestions} />
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