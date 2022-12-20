import { Link } from 'react-router-dom'; 
import { projects } from '../../../../trash/test-data'

const project = projects[0]; 

export default function ProjectShowcase() {
    return (
        <Link to={`/projects/${project.projectId}`} className="working-rooms-project">
            <div className="profile-img"></div>
            <h4>{ project.projectTitle }</h4>
            <div className="progress">
                <span>{ project.projectProgress }%</span>
                <div className="progress-container"><span style={{ width: `${project.projectProgress }%` }}></span></div>
            </div>
        </Link>
    )
}