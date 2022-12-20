import { useState } from 'react'
import ProjectTasks from './ProjectTasks';
import ProjectMembers from './ProjectMembers';
import ProjectChat from './ProjectChat';
import { projects } from '../../../trash/test-data';

const project = projects[0]

export default function Project({ id }) {

    const [currentTab, setCurrentTab] = useState('members')

    const handleTarget = ({ target }) => {
        setCurrentTab(target.getAttribute('target'));
        document.querySelectorAll('ul.tabs li').forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    }
    
    return (
        <>
            <div className="heading">
                <div className="project-title">
                    <div className="profile-img"></div>
                    <h2>{project.projectTitle}</h2>
                    <span>user#{project.projectOwner.userId}</span>
                </div>
                <div className="project-nav-tabs">
                    <ul className="tabs">
                        <li onClick={handleTarget} target='tasks'>Tasks</li>
                        <li onClick={handleTarget} target='members' className='active'>Members</li>
                        <li onClick={handleTarget} target='chat'>Chat</li>
                    </ul>
                </div>
                <div className="progress">
                    <span>{project.projectProgress}%</span>
                    <div className="progress-container"><span style={{ width: `${project.projectProgress}%` }}></span></div>
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