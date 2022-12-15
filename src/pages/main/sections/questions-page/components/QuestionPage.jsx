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
import { likePost, commentOnPost } from "../../../../../app/api"
import Answers from './Answers'

export default function QuestionPage() {

    const { id: questionId } = useParams();
    const queryClient = useQueryClient();

    const [question, setQuestion] = useState(queryClient.getQueryData([`get-question-${questionId}`])?.data[0])
    const [answer, setAnswer] = useState({
        description: '',
        code: '',
    });

    const { user_id: currentUserId } = useGlobalState().state.user;
    const { isLoading, data: response, error } = useQuestion(questionId, setQuestion)

    const { mutate:mutateLike } = useMutation(likePost);

    const handleLikeQuestion = () => {
        setQuestion({ ...question, liked: !question.liked, post_number_likes: question.liked ? question.post_number_likes - 1 : question.post_number_likes + 1 })
        mutateLike(question.post_id, {
            onSuccess: () => queryClient.invalidateQueries([`get-question-${questionId}`])
        })
    }

    const { mutate:mutateComment, isLoading:isCommenting } = useMutation(commentOnPost);
    const shareAnswer = (e) => {
        e.preventDefault();
        const body = { comment_body: answer.description, comment_code: answer.code };
        mutateComment({ body, postId : questionId }, {
            onSuccess: () => {
                setQuestion({ ...question, post_number_comments: question.post_number_comments });
                queryClient.invalidateQueries([`get-post-${questionId}-comments`]);
                setAnswer({ dexcription: '', code: '' });
            },
            onError: (err) => console.log('Error ' + err),
        });
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
                <Answers question={question} />
                <form onSubmit={shareAnswer} className="share-answer">
                    <label>Description</label>
                    <textarea 
                    onChange={({ target }) => setAnswer({...answer, description: target.value})} 
                    className='main-textarea' 
                    rows={7} 
                    value={answer.description} 
                    ></textarea> 

                    <label>Code</label>
                    <textarea
                    onChange={({ target }) => setAnswer({ ...answer, code: target.value })}
                    value={answer.code}
                    className="main-textarea code"
                    rows={7}
                    ></textarea>

                    <button className="main-button">Answer</button>
                </form>
            </div>
        </section>
    )
}