import { useState, createContext, useContext } from "react"
import { useLocation } from 'react-router-dom'; 
import ProjectTechnologies from './components/ProjectTechnologies';
import './style.css'

const shareSpecialPostContext = createContext();
export const useShareSpecialPostContext = () => useContext(shareSpecialPostContext);

const initialState = {
    title: '',
    description: '',
    technologies: [],
}
const projectLinks = [{
    id: new Date().getTime(),
    type: 'Source Code',
    link: '',
}
]

const questionCode = {code: 'hello world'}; 

export default function ShareYourWorkForm({ children }) {

    const { pathname } = useLocation();

    const updatePostInfo = (key, value) => setPostInfo({ ...postInfo, [key]: value });

    const [postInfo, setPostInfo] = useState(pathname === '/share-project' ? {...initialState, projectLinks} : {...initialState, questionCode});

    const submitShareWork = (e) => {
        e.preventDefault();
        console.log(postInfo);
    }

    return (
        <form className="share-work-form">
            <label>Title</label>
            <input onChange={({ target }) => updatePostInfo('title', target.value)} type="text" className='main-input' value={postInfo.title} />
            <label>Description</label>
            <textarea onChange={({ target }) => updatePostInfo('description', target.value)} className='main-textarea' rows={7} value={postInfo.description} ></textarea>

            <shareSpecialPostContext.Provider value={{ postInfo, updatePostInfo }}>
                {children}
                <ProjectTechnologies />
            </shareSpecialPostContext.Provider>

            <button onClick={submitShareWork} className="main-button">Submit</button>
        </form>
    )
}