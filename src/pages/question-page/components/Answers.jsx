import usePostComments from '../../../hooks/usePostComments';
import Answer from './Answer'
import Spinner from '../../components/spinner/Spinner'
import NetworkError from '../../components/network-error/NetworkError';

export default function Answers({ numberAnswers, questionId }) {

    const { isLoading, data: response, error } = usePostComments(questionId);

    if (isLoading) return <Spinner dim='25px' />
    if (!!error) return <NetworkError />
    if (response?.ok && response?.data?.length === 0) return <h3 className='no-comments'>No Answers</h3>
    return (
        <div className="question-answers">
            <h3>Answers {numberAnswers}</h3>
            {
                response.data.map((answer, idx) => {
                    return <Answer
                        key={idx}
                        answerOwnerId={answer.comment_owner_id}
                        answerId={answer.comment_id}
                        answerDescription={answer.comment_body}
                        answerCode={answer.comment_code}
                        answerOwnerImg={answer.img_url}
                        username={answer.username}

                    />
                })
            }
        </div>
    )
}