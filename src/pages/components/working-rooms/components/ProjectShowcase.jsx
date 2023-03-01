import { Link } from 'react-router-dom'; 
import ProfileImg from '../../profile-img/ProfileImg'
import ProgressBar from '../../progress-bar/ProgressBar'

export default function ProjectShowcase({ projectId, projectTitle, projectOwnerImg }) {
    return (
        <Link to={`/projects/${projectId}`} className="working-rooms-project">
            <ProfileImg url={projectOwnerImg} />
            <h4>{ projectTitle }</h4>
            <ProgressBar progress={34} />
        </Link>
    )
}