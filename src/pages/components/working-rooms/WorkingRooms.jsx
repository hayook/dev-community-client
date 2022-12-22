import { Link } from 'react-router-dom';
import ProjectShowcase from './components/ProjectShowcase'
import './style.css'

export default function WorkingRooms() {
    return (
        <section className="working-rooms">
            <div className="current-projects">
                <h2>Your Current Projects</h2>
                <div className="projects-list">
                    <ProjectShowcase />
                </div>
                <Link to="/projects/new" className="main-button">Start A New Project</Link>
            </div>
            <div className="user-invites">
                <h2>Invites</h2>
                <div className="invites-list">
                    <div className="invite">
                        <h4>Project Name</h4>
                        <div className="functionalities">
                            <button className="main-button">Accept</button>
                            <button className="main-button reject">Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}