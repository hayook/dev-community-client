import { useState } from 'react'
import ProjectTasks from './ProjectTasks';
import ProjectMembers from './ProjectMembers';
import ProjectChat from './ProjectChat';
import useProject from '../../../hooks/useProject'

export default function Project({ id }) {

    const { isLoading, data, error } = useProject(id);

    const [currentTab, setCurrentTab] = useState('members')

    const handleTarget = ({ target }) => {
        setCurrentTab(target.getAttribute('target'));
        document.querySelectorAll('ul.tabs li').forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    }

    if (isLoading) return <h1>Loading...</h1>
    return (
        <>
            <div className="heading">
                <div className="project-title">
                    <div className="profile-img"></div>
                    <h2>{data.projectTitle}</h2>
                    <span>user#{data.userId}</span>
                </div>
                <div className="project-nav-tabs">
                    <ul className="tabs">
                        <li onClick={handleTarget} target='tasks'>Tasks</li>
                        <li onClick={handleTarget} target='members' className='active'>Members</li>
                        <li onClick={handleTarget} target='chat'>Chat</li>
                    </ul>
                </div>
                <div className="progress">
                    <span>{data.progress}%</span>
                    <div className="progress-container"><span style={{ width: `${data.progress}%` }}></span></div>
                </div>
            </div>
            <div className="dashboard-content">
                {currentTab === 'tasks' && <ProjectTasks />}
                {currentTab === 'members' && <ProjectMembers />}
                {currentTab === 'chat' && <ProjectChat />}
            </div>
        </>
    )
}