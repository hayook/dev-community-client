import CurrentProjects from './components/CurrentProjects'
import Invites from './components/Invites'
import { Link } from 'react-router-dom';
import './style.css'

export default function WorkingRooms() {
    return (
        <section className="working-rooms">
            <div className="current-projects">
                <h2>Your Current Projects</h2>
                <div className="projects-list">
                    <CurrentProjects />
                </div>
                <Link to="/projects/new" className="main-button">Start A New Project</Link>
            </div>
            <div className="user-invites">
            <h2>Invites</h2>
            <Invites />
        </div>
        </section>
    )
}