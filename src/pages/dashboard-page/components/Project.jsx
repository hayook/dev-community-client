import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProjectTasks from './ProjectTasks';
import ProjectMembers from './ProjectMembers';
import ProjectChat from './ProjectChat';
import Spinner from '../../components/spinner/Spinner'
import useProject from '../../../hooks/useProject'
import ProfileImg from '../../components/profile-img/ProfileImg'
import DeletePostModel from '../../components/delete-model/DeleteModel';
import { useMutation, useQueryClient } from 'react-query';
import { removeProject } from '../../../app/api';
import { isAdmin } from '../../../lib/project'
import { activateTab } from '../../../lib/dom'
import { NotFound } from '../../not-found-page/NotFoundPage'
import { useRef } from 'react';
import ProjectOverview from './ProjectOverview'
import ProgressBar from '../../components/progress-bar/ProgressBar'
import NetworkError from '../../components/network-error/NetworkError'


export default function Project({ id }) {

    const navigate = useNavigate()
    const ulRef = useRef()

    const { id: projectId } = useParams()
    const { isLoading, data: response, error, refetch: refetchProject } = useProject(id);
    const queryClient = useQueryClient()

    const [currentTab, setCurrentTab] = useState('members')
    const [deleteProjectModel, setDeleteProjectModel] = useState(false)

    const openModel = () => setDeleteProjectModel(true)
    const closeModel = () => setDeleteProjectModel(false)

    const { isLoading: isDeleting, mutate } = useMutation(removeProject)
    const removeProjectHandler = () => {
        mutate({ projectId }, {
            onSuccess: res => {
                closeModel()
                navigate('/')
            }
        })
    }

    const handleTarget = ({ target }) => {
        setCurrentTab(target.getAttribute('target'));
    }

    if (isLoading) return <div className="inner-center"><Spinner dim='30px' /></div>
    if (response?.ok && 'data' in response) return (
        <section className='project-dashboard'>
            <div className='inner-container'>
                {deleteProjectModel &&
                    <DeletePostModel
                        modelHeading='Delete Project'
                        type='project'
                        cancelDelete={closeModel}
                        submitDelete={removeProjectHandler}
                        isDeleting={isDeleting}
                    />
                }
                <div className="heading">
                    <div className="project-title">
                        <Link className="profile-img" to={`/user/${response.data.project_owner_id}`}><ProfileImg url={response.data.img_url} /></Link>
                        <h2>{response.data.project_name}</h2>
                        <Link to={`/user/${response.data.project_owner_id}`}>{response.data.username}</Link>
                        {isAdmin(queryClient, projectId) &&
                            <div className="settings">
                                <Link to={`/projects/${projectId}/edit`}>Edit Project</Link>
                                <button onClick={openModel}>Delete Project</button>
                            </div>
                        }
                    </div>
                    <div className="project-nav-tabs">
                        <ul ref={ulRef} className="tabs" onClick={e => activateTab(ulRef, e, setCurrentTab)} >
                            {isAdmin(queryClient, projectId) && <li target='overview'>Overview</li>}
                            <li target='tasks'>Tasks</li>
                            <li target='members' className='active'>Members</li>
                            <li target='chat'>Chat</li>
                        </ul>
                    </div>
                    <ProgressBar progress={response?.data?.project_progress} />
                </div>
                <div className="dashboard-content">
                    {currentTab === 'tasks' && <ProjectTasks />}
                    {currentTab === 'members' && <ProjectMembers />}
                    {currentTab === 'chat' && <ProjectChat />}
                    {currentTab === 'overview' && <ProjectOverview />}
                </div>
            </div>
        </section>
    )
    if (!response?.ok) return <div className="inner-center"><NotFound /></div>
    return <div className="inner-center"><NetworkError refetch={refetchProject} /></div>
}