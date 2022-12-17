import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../components/main/Main'
import NavSideBar from '../components/nav-side-bar/NavSideBar'
import ProjectTasks from './components/ProjectTasks';
import ProjectMembers from './components/ProjectMembers';
import ProjectChat from './components/ProjectChat';
import './style.css'
import '../components/working-rooms/style.css' // Temp for the profile image styling

export default function DashboardPage() {

    const { id } = useParams()
    const [targetContent, setTargetContent] = useState('members')

    const handleTarget = ({ target }) => {
        setTargetContent(target.getAttribute('target'));
        document.querySelectorAll('ul.tabs li').forEach(item => item.classList.remove('active'));
        target.classList.add('active')
    }

    return (
        <Main className="dashboard" >
            <NavSideBar />
            <section className='dashboard-page'>
                <div className="heading">
                    <div className="project-title">
                        <div className="profile-img"></div> 
                        <h2>This is an awesome project</h2>
                        <span>Project Owner</span>
                    </div>
                    <div className="project-nav-tabs">
                    <ul className="tabs">
                        <li onClick={handleTarget} target='tasks' className='active'>Tasks</li>
                        <li onClick={handleTarget} target='members'>Members</li>
                        <li onClick={handleTarget} target='chat'>Chat</li>
                    </ul>
                </div>
                    <div className="progress">
                        <span>63%</span>
                        <div className="progress-container"><span style={{ width: '63%' }}></span></div>
                    </div>
                </div>
                <div className="dashboard-content">
                    { targetContent === 'tasks' && <ProjectTasks />}
                    { targetContent === 'members' && <ProjectMembers />}
                    { targetContent === 'chat' && <ProjectChat />}
                </div>
            </section>
        </Main>
    )
}