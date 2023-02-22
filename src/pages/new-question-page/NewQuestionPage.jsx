import { useState, createContext, useContext } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import ProjectTechnologies from './components/ProjectTechnologies';
import { editPost, sharePost } from '../../app/api'
import Spinner from '../components/spinner/Spinner'
import { getQuestionById } from "../../hooks/useQuestion";
import Main from '../components/main/Main';
import NavSideBar from '../components/nav-side-bar/NavSideBar';
import QuestionCode from './components/QuestionCode';
import './style.css'
import useCurrentUserData from "../../hooks/useCurrentUserData";
import NotFoundPage from '../not-found-page/NotFoundPage'
import MainButton from '../components/main-button/MainButton'

const NewQuestionContext = createContext();
export const useNewQuestionContext = () => useContext(NewQuestionContext);

export default function ShareYourWorkForm() {

    const { currentUserId } = useCurrentUserData()
    const navigate = useNavigate()

    const { id } = useParams();
    const [postInfo, setPostInfo] = useState({
        title: '',
        description: '',
        questionCode: '',
        postType: 'question',
        technologies: []
    });
    const updatePostInfo = (key, value) => setPostInfo({ ...postInfo, [key]: value });

    const { isLoading, error, data: response } = useQuery([`get-question-${id}`, 'toEdit'], () => getQuestionById(id), {
        enabled: !!id,
        onSuccess: (res) => {
            setPostInfo({ ...postInfo, title: res.data[0].post_title, description: res.data[0].post_body, questionCode: res.data[0].post_code, questionOwnerId: res.data[0].post_owner_id })
        }
    });


    const { mutate: mutateShare, isLoading: isSharing } = useMutation(sharePost);
    const submitShareWork = (e) => {
        e.preventDefault();
        const question = {
            post_title: postInfo.title,
            post_body: postInfo.description,
            post_code: postInfo.questionCode,
            post_type: postInfo.postType,
        };
        mutateShare(question, {
            onSuccess: res => navigate(`/questions/${res.data}`)
        })
    }

    const { mutate: mutateEdit, isLoading: isEditing } = useMutation(editPost);
    const submitEditQuestion = (e) => {
        e.preventDefault();
        const newQuestion = { post_title: postInfo.title, post_body: postInfo.description, post_code: postInfo.questionCode, post_type: 'question' }
        mutateEdit({ newPost: newQuestion, postId: id }, {
            onSuccess: res => navigate(`/questions/${res.data[0].post_id}`),
        })

    }

    if (id && postInfo.questionOwnerId !== currentUserId) return <NotFoundPage />
    if (isLoading) return <Spinner dim="30px" />
    if (error) return <h1>Error</h1>
    return (
        <Main>
            <form onSubmit={!!id ? submitEditQuestion : submitShareWork} className="share-work-form">
                <label>Title</label>
                <input onChange={({ target }) => updatePostInfo('title', target.value)} type="text" className='main-input' value={postInfo.title} />
                <label>Description</label>
                <textarea onChange={({ target }) => updatePostInfo('description', target.value)} className='main-textarea' rows={7} value={postInfo.description} ></textarea>

                <NewQuestionContext.Provider value={{ postInfo, updatePostInfo }}>
                    <QuestionCode />
                    <ProjectTechnologies />
                </NewQuestionContext.Provider>

                <MainButton disabled={isSharing || isEditing}>Submit</MainButton>
            </form>

        </Main >
    )
}