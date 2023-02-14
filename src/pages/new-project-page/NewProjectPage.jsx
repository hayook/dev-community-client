import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../components/main/Main'
import { useMutation } from 'react-query'
import NavSideBar from '../components/nav-side-bar/NavSideBar'
import { createProject } from '../../app/api'
import Spinner from '../components/spinner/Spinner'
import MainButton from '../components/main-button/MainButton'

import './style.css'

export default function NewProjectPage() {

    const navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState({
        projectTitle: '',
        projectDescription: '',
    });

    const { isLoading, mutate } = useMutation(createProject)
    const handleSubmit = e => {
        e.preventDefault();
        const body = { project_name: projectInfo.projectTitle, project_description: projectInfo.projectDescription }
        mutate(body, {
            onSuccess: res => {
                navigate(`/projects/${res.data[0].project_id}`)
            }
        })
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

                    <MainButton disabled={isLoading}>Submit</MainButton>

                </form>
            </Main>
        </>
    )
}