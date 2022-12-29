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
import { isAdmin } from '../../../utiles/is-admin'


export default function Project({ id }) {

    const navigate = useNavigate()

    const { id: projectId } = useParams()
    const { isLoading, data: response, error } = useProject(id);
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
        document.querySelectorAll('ul.tabs li').forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    }

    if (isLoading) return <Spinner dim='30px' />
    if (response.ok && 'data' in response) return (
        <>
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
                    <ProfileImg />
                    <h2>{response.data.project_name}</h2>
                    <span>user#{response.data.project_owner_id}</span>
                    {isAdmin(queryClient, projectId) &&
                        <div className="settings">
                            <Link to={`/projects/${projectId}/edit`}>Edit Project</Link>
                            <button onClick={openModel}>Delete Project</button>
                        </div>
                    }
                </div>
                <div className="project-nav-tabs">
                    <ul className="tabs">
                        <li onClick={handleTarget} target='tasks'>Tasks</li>
                        <li onClick={handleTarget} target='members' className='active'>Members</li>
                        <li onClick={handleTarget} target='chat'>Chat</li>
                    </ul>
                </div>
                <div className="progress">
                    <span>0%</span>
                    <div className="progress-container"><span style={{ width: `0%` }}></span></div>
                </div>
            </div>
            <div className="dashboard-content">
                {currentTab === 'tasks' && <ProjectTasks />}
                {currentTab === 'members' && <ProjectMembers />}
                {currentTab === 'chat' && <ProjectChat />}
            </div>
        </>
    )
    if (!response.ok) return <h1>{response.status}</h1>
    return <h1>Error {error?.message}</h1>
}