import { useParams } from "react-router-dom"
import useQuestion from '../../../../../hooks/useQuestion'
import UserProfileShowcase from '../../../../../components/user-profile-showcase/UserProfileShowcase'
import Spinner from '../../../../../components/spinner/Spinner'
import { splitDate } from '../../../../../utiles/split-date'
import Code from '../../../../../components/code/Code'
import SvgIcon from '../../../../../assets/icons/SvgIcon'
import { icons } from '../../../../../assets/icons/icons/'
import { useState } from 'react'
import { useMutation, useQueryClient } from "react-query"
import { useGlobalState } from '../../../../../app/GlobalStateProvider'
import { likePost } from "../../../../../app/api"

export default function QuestionPage() {

    const { id: questionId } = useParams();
    const queryClient = useQueryClient();

    const [question, setQuestion] = useState(queryClient.getQueryData([`get-question-${questionId}`])?.data[0])
    const [answer, setAnswer] = useState('');

    const { user_id: currentUserId } = useGlobalState().state.user;
    const { isLoading, data: response, error } = useQuestion(questionId, setQuestion)

    const { mutate } = useMutation(likePost);
    const handleLikeQuestion = () => {
        setQuestion({ ...question, liked: !question.liked, post_number_likes: question.liked ? question.post_number_likes - 1 : question.post_number_likes + 1 })
        mutate(question.post_id, {
            onSuccess: () => queryClient.invalidateQueries([`get-question-${questionId}`])
        })
    }

    if (isLoading) return <Spinner dim="30px" />
    return (
        <section className="question-page">
            <div className="container">
                <div className="question-info">
                    <h2>{question.post_title}</h2>
                    <p>{question.post_body}</p>
                    <Code language={'javascript'} code={question.post_code} />
                </div>
                {question.post_owner_id === currentUserId &&
                    <div className="question-functionalities">
                        <button>Edit Question</button>
                        <button>Delete Question</button>
                    </div>
                }
                <div className="question-more-info">
                    <UserProfileShowcase userId={question.post_owner_id} />
                    <span className="date">{splitDate(question.post_creation_date)}</span>
                    <button onClick={handleLikeQuestion} className="like-question">
                        <SvgIcon path={icons.like} fill={question.liked && 'white'} /> {question.post_number_likes} likes
                    </button>
                </div>
                <div className="question-answers">
                    <h3>Answers {question.post_number_comments}</h3>
                </div>
                <form className="share-answer">
                    <label>Description</label>
                    <textarea onChange={({ target }) => setAnswer(target.value)} className='main-textarea' rows={7} value={answer} ></textarea> 
                </form>
            </div>
        </section>
    )
}