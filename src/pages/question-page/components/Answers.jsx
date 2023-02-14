import usePostComments from '../../../hooks/usePostComments';
import Answer from './Answer'
import Spinner from '../../components/spinner/Spinner'

export default function Answers({ question }) {

    const { isLoading, data: response, error } = usePostComments(question.post_id);

    if (isLoading) return <Spinner dim='25px' />
    if (error) return <h3>{error.message}</h3>
    if (response.ok && response.data.length === 0) return <h3 className='no-comments'>No Answers</h3>

    return (
        <div className="question-answers">
            <h3>Answers {question.post_number_comments}</h3>
            {
                response.data.map(answer => {
                    return <Answer 
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