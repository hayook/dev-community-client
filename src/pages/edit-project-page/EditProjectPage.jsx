import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Main from '../components/main/Main'
import { useMutation, useQueryClient } from 'react-query'
import NavSideBar from '../components/nav-side-bar/NavSideBar'
import { createProject, editProject } from '../../app/api'
import Spinner from '../components/spinner/Spinner'
import '../new-project-page/style.css'
import useProject from '../../hooks/useProject'
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/NotFoundPage'
import MainButton from '../components/main-button/MainButton'

export default function NewProjectPage() {

    const navigate = useNavigate();
    const { id: projectId } = useParams();

    const { isLoading: isFetching, data: response, error } = useProject(projectId)

    const [projectInfo, setProjectInfo] = useState({
        projectTitle: response?.project_name,
        projectDescription: response?.project_description,
    });

    useEffect(() => {
        if (!!response) setProjectInfo(prev => {
            return ({
                projectTitle: response?.data?.project_name,
                projectDescription: response?.data?.project_description,
            })
        })
    }, [response]);

    const { isLoading:isSubmitting, mutate } = useMutation(editProject)
    const submitEdit = e => {
        e.preventDefault();
        const project = {
            project_name: projectInfo.projectTitle, 
            project_description: projectInfo.projectDescription 
        }
        mutate({ projectId, project }, {
            onSuccess: res => {
                navigate(`/projects/${projectId}`)
            }
        })

        
    }

    if (isFetching) return <Spinner dim='30px' />
   if (response?.ok && 'data' in response) return (
        <Main>
            <NavSideBar />
            <form className='new-project' onSubmit={submitEdit}>
                {isFetching ? <Spinner dim='30px' /> :
                    <>
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
                        <MainButton disabled={isSubmitting}>Submit</MainButton>
                        </>

                }
            </form>

        </Main>
    )
    if (!response?.ok) {
        if (response?.status === 403) return <NotFoundPage />
        return <h1>{response?.status}</h1>
    }
    if (error) return <h1>Error [ error.message ]</h1>
}