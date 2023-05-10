import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../components/main/Main'
import { useMutation } from 'react-query'
import { createProject } from '../../app/api'
import MainButton from '../components/main-button/MainButton'
import { emptyString } from '../../lib/string';

import './style.css'

export default function NewProjectPage() {

    const titleFieldRef = useRef(null);

    const navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState({
        projectTitle: '',
        projectDescription: '',
    });

    const { isLoading, mutate } = useMutation(createProject)
    const handleSubmit = e => {
        e.preventDefault();

        titleFieldRef.current.classList.remove('error-field');
        if (emptyString(projectInfo.projectTitle)) {
            titleFieldRef.current.focus();
            titleFieldRef.current.classList.add('error-field');
            return;
        }

        const body = { project_name: projectInfo.projectTitle, project_description: projectInfo.projectDescription }
        mutate(body, {
            onSuccess: res => {
                navigate(`/projects/${res.data}`);
            }
        })
    }

    return (
        <>
            <Main>
                <form className='new-project secondary-form' onSubmit={handleSubmit}>
                    <label>Project Title</label>
                    <input
                        ref={titleFieldRef}
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