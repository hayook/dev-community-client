import { Link } from 'react-router-dom'; 
import ProfileImg from '../../profile-img/ProfileImg'

export default function ProjectShowcase({ projectId, projectTitle }) {
    return (
        <Link to={`/projects/${projectId}`} className="working-rooms-project">
            <ProfileImg />
            <h4>{ projectTitle }</h4>
            <div className="progress">
                <span>0%</span>
                <div className="progress-container"><span style={{ width: `0%` }}></span></div>
            </div>
        </Link>
    )
}