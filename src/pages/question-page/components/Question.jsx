import { useState } from 'react'
import { useMutation, useQueryClient } from "react-query"
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import useQuestion from '../../../hooks/useQuestion'
import ProfileImg from '../../components/profile-img/ProfileImg'
import Spinner from '../../components/spinner/Spinner'
import { splitDate } from '../../../utiles/split-date'
import Code from '../../components/code/Code'
import SvgIcon from '../../../assets/icons/SvgIcon'
import { icons } from '../../../assets/icons/icons'
import { useGlobalState } from '../../../app/GlobalStateProvider'
import { likePost, commentOnPost, deletePost } from "../../../app/api"
import Answers from './Answers'
import DeleteModel from '../../components/delete-model/DeleteModel';

export default function Question() {

    const navigate = useNavigate();

    const { id: questionId } = useParams();
    const queryClient = useQueryClient();

    const [question, setQuestion] = useState(queryClient.getQueryData([`get-question-${questionId}`])?.data[0])
    const [answer, setAnswer] = useState({
        description: '',
        code: '',
    });
    const [deleteModel, setDeleteModel] = useState(false);

    const closeDeleteModel = () => setDeleteModel(false)
    const openDeleteModel = () => setDeleteModel(true)

    const { user_id: currentUserId } = useGlobalState().state.user;
    const { isLoading, data: response, error } = useQuestion(questionId, setQuestion)

    const { mutate: mutateLike } = useMutation(likePost);

    const handleLikeQuestion = () => {
        setQuestion({ ...question, liked: !question.liked, post_number_likes: question.liked ? question.post_number_likes - 1 : question.post_number_likes + 1 })
        mutateLike(question.post_id, {
            onSuccess: () => queryClient.invalidateQueries([`get-question-${questionId}`])
        })
    }

    const { mutate: mutateComment, isLoading: isCommenting } = useMutation(commentOnPost);
    const shareAnswer = (e) => {
        e.preventDefault();
        const body = { comment_body: answer.description, comment_code: answer.code };
        mutateComment({ body, postId: questionId }, {
            onSuccess: () => {
                setQuestion({ ...question, post_number_comments: question.post_number_comments });
                queryClient.invalidateQueries([`get-post-${questionId}-comments`]);
                setAnswer({ dexcription: '', code: '' });
            },
            onError: (err) => console.log('Error ' + err),
        });
    }

    const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(deletePost)
    const handleDeleteQuestion = () => {
        mutateDelete(questionId, {
            onSuccess: () => {
                closeDeleteModel();
                navigate('/questions')
            },
            onError: (err) => console.log('error ' + err)
        })
    }

    if (isLoading) return <Spinner dim="30px" />
    return (
        <section className="question-page">
            {deleteModel &&
                <DeleteModel type={'question'}
                    isDeleting={isDeleting}
                    cancelDelete={closeDeleteModel}
                    submitDelete={handleDeleteQuestion} />
            }
            <div className="container">
                <div className="question-info">
                    <h2>{question.post_title}</h2>
                    <p>{question.post_body}</p>
                    <Code language={'javascript'} code={question.post_code} />
                </div>
                {question.post_owner_id === currentUserId &&
                    <div className="question-functionalities">
                        <Link to={`/questions/${questionId}/edit`}>Edit Question</Link>
                        <button onClick={openDeleteModel}>Delete Question</button>
                    </div>
                }
                <div className="question-more-info">
                    <Link to={`/user/${question.post_owner_id}`} className="user-profile">
                        <ProfileImg />
                        <span>{question.username}</span>
                    </Link>
                    <span className="date">{splitDate(question.post_creation_date)}</span>
                    <button onClick={handleLikeQuestion} className="like-question">
                        <SvgIcon path={icons.like} fill={question.liked && 'white'} /> {question.post_number_likes} likes
                    </button>
                </div>
                <Answers question={question} />
                <form onSubmit={shareAnswer} className="share-answer">
                    <label>Description</label>
                    <textarea
                        onChange={({ target }) => setAnswer({ ...answer, description: target.value })}
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