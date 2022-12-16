import { useState, createContext, useContext } from "react"
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ProjectTechnologies from './components/ProjectTechnologies';
import { editPost, sharePost } from '../../app/api'
import Spinner from '../../components/spinner/Spinner'
import './style.css'
import { useParams } from 'react-router-dom';
import { getQuestionById } from "../../hooks/useQuestion";
import { useGlobalState } from '../../app/GlobalStateProvider'

const shareSpecialPostContext = createContext();
export const useShareSpecialPostContext = () => useContext(shareSpecialPostContext); 

export default function ShareYourWorkForm({ children, initialState }) {

    const { user_id:userId } = useGlobalState().state.user;

    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(initialState);
    const updatePostInfo = (key, value) => setPostInfo({ ...postInfo, [key]: value });

    const { isLoading, error, data:response } = useQuery([`get-question-${id}`, 'toEdit'], () => getQuestionById(id), {
        enabled: !!id, 
        onSuccess: (res) => {
            setPostInfo({ ...postInfo, title: res.data[0].post_title, description: res.data[0].post_body, questionCode: res.data[0].post_code, questionOwnerId: res.data[0].post_owner_id })
        }
    });


    const { mutate:mutateShare, isLoading:isSharing } = useMutation(sharePost);
    const submitShareWork = (e) => {
        e.preventDefault();
        const question = {
            post_title: postInfo.title,
            post_body: postInfo.description,
            post_code: postInfo.questionCode,
            post_type: postInfo.postType,
        };
        mutateShare(question, {
            onSuccess: (res) => console.log(res)
        })
    }

    const { mutate:mutateEdit, isLoading:isEditing } = useMutation(editPost);
    const submitEditQuestion = (e) => {
        e.preventDefault();
        const newQuestion = { post_title: postInfo.title, post_body: postInfo.description, post_code: postInfo.questionCode, post_type: 'question' }
        mutateEdit({ newPost: newQuestion, postId: id }, {
            onSuccess: () => console.log('success'),
        })

    }
    
    if (id && postInfo.questionOwnerId !== userId) return <h1>Not Found</h1> 
    if (isLoading) return <Spinner dim="30px" />
    if (error) return <h1>Error</h1>
    return (
        <form onSubmit={!!id ? submitEditQuestion : submitShareWork} className="share-work-form">
            <label>Title</label>
            <input onChange={({ target }) => updatePostInfo('title', target.value)} type="text" className='main-input' value={postInfo.title} />
            <label>Description</label>
            <textarea onChange={({ target }) => updatePostInfo('description', target.value)} className='main-textarea' rows={7} value={postInfo.description} ></textarea>

            <shareSpecialPostContext.Provider value={{ postInfo, updatePostInfo }}>
                {children}
                <ProjectTechnologies />
            </shareSpecialPostContext.Provider>

            <button className="main-button" disabled={isSharing || isEditing}>{(isEditing || isSharing) ? <Spinner dim="20px" /> : 'Submit'}</button>
        </form>
    )
}