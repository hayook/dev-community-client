import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../components/main/Main'
import NavSideBar from '../components/nav-side-bar/NavSideBar'
import './style.css'

export default function NewProjectPage() {

    const navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState({
        projectTitle: '',
        projectDescription: '',
    });

    const handleSubmit = e => {
        e.preventDefault();
        // post the project & navigate to /projects/:id   
        navigate('/projects/1'); 
    }

    return (
        <>
            <Main>
                <NavSideBar />
                <form className='new-project' onSubmit={handleSubmit}>
                    <label>Project Title</label>
                    <input 
                    onChange={({ target }) => setProjectInfo(prev => ({ ...prev, projectTitle: target.value }))} 
                    type='text' 
                    className='main-input' 
                    value={projectInfo.projectTitle}
                    />

                    <label>Project Description</label>
                    <textarea 
                    onChange={({ target }) => setProjectInfo(prev => ({ ...prev, projectDescription: target.value }))} 
                    rows={7} 
                    type='text' 
                    className='main-textarea' 
                    value={projectInfo.projectDescription} 
                    />

                    <button className="main-button">Submit</button>

                </form>
            </Main>
        </>
    )
}