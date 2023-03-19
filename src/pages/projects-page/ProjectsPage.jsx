import Main from "../components/main/Main";
import { Link } from 'react-router-dom';
import CurrentProjects from '../components/working-rooms/components/CurrentProjects'
import Invites from '../components/working-rooms/components/Invites'
import './style.css'

export default function ProjectsPage() {
    return (
        <Main>
            <div className="projects-page">
                <div className="inner-container">
                    <div className="current-projects">
                        <h1>Your Current Projects</h1>
                        <div className="projects-list">
                            <CurrentProjects />
                        </div>
                        <Link to="/projects/new" className="main-button">Start A New Project</Link>
                    </div>
                    <div className="invites">
                        <h1>Invites</h1>
                        <Invites />
                    </div>
                </div>
            </div>
        </Main>
    )
}