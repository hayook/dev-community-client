import { useState } from 'react'
import { useMutation, useQueryClient } from "react-query"
import { useNavigate, Link } from 'react-router-dom'
import ProfileImg from '../../components/profile-img/ProfileImg'
import Code from '../../components/code/Code'
import MainButton from '../../components/main-button/MainButton'
import SvgIcon from '../../../assets/icons/SvgIcon'
import { icons } from '../../../assets/icons/icons'
import { likePost, commentOnPost, deletePost } from "../../../app/api"
import Answers from './Answers'
import DeleteModel from '../../components/delete-model/DeleteModel';
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import { useRef } from 'react'
import { fullSpaces } from '../../../lib/string'
import Show from '../../components/show/Show'

const initialState = { description: '', code: '' }

export default function Question({ numberLikes, numberAnswers, questionOwnerId, questionOwnerUsername, questionTitle, questionBody, questionCode, questionCreationDate, questionOwnerProfileImg, liked, questionId, questionTechnologies }) {

    const answerDescRef = useRef(null);
    const answerCodeRef = useRef(null);

    const navigate = useNavigate();

    const { currentUserId } = useCurrentUserData()
    const queryClient = useQueryClient();

    const [nbrLikes, setNbrLikes] = useState(numberLikes);
    const [isLiked, setIsLiked] = useState(liked)
    const [answer, setAnswer] = useState(initialState);
    const [deleteModel, setDeleteModel] = useState(false);

    const closeDeleteModel = () => setDeleteModel(false)
    const openDeleteModel = () => setDeleteModel(true)

    const { mutate: mutateLike } = useMutation(likePost);
    const handleLikeQuestion = () => {
        setNbrLikes(isLiked ? nbrLikes - 1 : nbrLikes + 1);
        setIsLiked(!isLiked)
        mutateLike(questionId, {
            onSuccess: () => queryClient.invalidateQueries([`get-question-${questionId}`])
        })
    }

    const { mutate: mutateComment, isLoading: isCommenting } = useMutation(commentOnPost);
    const shareAnswer = (e) => {
        e.preventDefault();

        answerDescRef.current.classList.remove('error-field');
        answerCodeRef.current.classList.remove('error-field');

        if (fullSpaces(answer.description)) {
            answerDescRef.current.focus();
            answerDescRef.current.classList.add('error-field');
            return;
        }

        const body = { comment_body: answer.description, comment_code: answer.code };
        mutateComment({ body, postId: questionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`get-post-${questionId}-comments`]);
                queryClient.invalidateQueries([`get-question-${questionId}`]);
                setAnswer(initialState);
            },
        });
    }

    const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(deletePost)
    const handleDeleteQuestion = () => {
        mutateDelete(questionId, {
            onSuccess: () => {
                closeDeleteModel();
                navigate('/questions')
            }
        })
    }
    return (
        <>
            {deleteModel &&
                <DeleteModel
                    type='question'
                    isDeleting={isDeleting}
                    cancelDelete={closeDeleteModel}
                    submitDelete={handleDeleteQuestion} />
            }
            <section className="question-page">
                <div className="inner-container">
                    <div className="question-info">
                        <h2>{questionTitle}</h2>
                        <p>{questionBody}</p>
                        <Code language={'javascript'} code={questionCode} />
                        <ul className="question-techs">
                            {
                                questionTechnologies.map((tech, idx) => <li key={idx} className="question-tech">{tech.technology_name.toUpperCase()}</li>)
                            }
                        </ul>
                    </div>
                    <Show when={questionOwnerId === currentUserId}>
                        <div className="question-functionalities">
                            <Link to={`/questions/${questionId}/edit`}>Edit Question</Link>
                            <button onClick={openDeleteModel}>Delete Question</button>
                        </div>
                    </Show>

                    <div className="question-more-info">
                        <Link to={`/user/${questionOwnerId}`} className="user-profile">
                            <ProfileImg url={questionOwnerProfileImg} />
                            <span>{questionOwnerUsername}</span>
                        </Link>
                        <span className="date">{new Date(questionCreationDate).toLocaleDateString()}</span>
                        <button onClick={handleLikeQuestion} className="like-question">
                            <SvgIcon path={icons.like} fill={isLiked && 'white'} /> {nbrLikes} likes
                        </button>
                    </div>
                    <Answers questionId={questionId} numberAnswers={numberAnswers} />
                    <form onSubmit={shareAnswer} className="share-answer">
                        <label>Description</label>
                        <textarea
                            ref={answerDescRef}
                            onChange={({ target }) => setAnswer({ ...answer, description: target.value })}
                            className='main-textarea'
                            rows={7}
                            value={answer.description}
                        ></textarea>

                        <label>Code</label>
                        <textarea
                            ref={answerCodeRef}
                            onChange={({ target }) => setAnswer({ ...answer, code: target.value })}
                            value={answer.code}
                            className="main-textarea code"
                            rows={7}
                        ></textarea>

                        <MainButton disabled={isCommenting}>Answer</MainButton>
                    </form>
                </div>
            </section>
        </>
    )

}