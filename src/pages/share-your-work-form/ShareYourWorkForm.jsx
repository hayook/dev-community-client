import { useState, createContext, useContext } from "react"
import { useMutation, useQueryClient } from 'react-query';
import ProjectTechnologies from './components/ProjectTechnologies';
import { sharePost } from '../../app/api'
import Spinner from '../../components/spinner/Spinner'
import './style.css'

const shareSpecialPostContext = createContext();
export const useShareSpecialPostContext = () => useContext(shareSpecialPostContext); 

export default function ShareYourWorkForm({ children, initialState }) {

    const updatePostInfo = (key, value) => setPostInfo({ ...postInfo, [key]: value });

    const [postInfo, setPostInfo] = useState(initialState);

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(sharePost);
    const submitShareWork = (e) => {
        e.preventDefault();
        const question = {
            post_title: postInfo.title,
            post_body: postInfo.description,
            post_code: postInfo.questionCode,
            post_type: postInfo.postType,
        };
        mutate(question, {
            onSuccess: (res) => console.log(res)
        })
    }

    return (
        <form onSubmit={submitShareWork} className="share-work-form">
            <label>Title</label>
            <input onChange={({ target }) => updatePostInfo('title', target.value)} type="text" className='main-input' value={postInfo.title} />
            <label>Description</label>
            <textarea onChange={({ target }) => updatePostInfo('description', target.value)} className='main-textarea' rows={7} value={postInfo.description} ></textarea>

            <shareSpecialPostContext.Provider value={{ postInfo, updatePostInfo }}>
                {children}
                <ProjectTechnologies />
            </shareSpecialPostContext.Provider>

            <button className="main-button" disabled={isLoading}>{isLoading ? <Spinner dim="20px" /> : 'Submit'}</button>
        </form>
    )
}