import { Link } from 'react-router-dom';
import ProjectShowcase from './components/ProjectShowcase'
import './style.css'

export default function WorkingRooms() {
    return (
        <section className="working-rooms">
            <div className="working-rooms-container">
                <h2>Your Current Projects</h2>
                <div className="working-rooms-projects">
                    <ProjectShowcase />
                </div>
                <Link to="/projects/new" className="main-button">Start A New Project</Link>
            </div>
        </section>
    )
}