import { useQueryClient } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import ProfileImg from '../../components/profile-img/ProfileImg'
import { isAdmin } from '../../../utiles/is-admin'

export default function ProjectMember({ memberUsername, memberRole, memberId, memberImg, children }) {

    const { id: projectId } = useParams()
    const queryClient = useQueryClient()

    return (
        <div className="project-member">
            <div className={`member-info ${memberRole ? 'role' : ''}`}>
                <Link className="profile-img" to={`/user/${memberId}`}><ProfileImg url={memberImg} dim='2.4em' /></Link>
                <Link to={`/user/${memberId}`}><span className='username'> { memberUsername } </span></Link>
                {memberRole &&
                    <span className="user-role">
                        {memberRole.toUpperCase()}
                    </span>
                }
            </div>
            {isAdmin(queryClient, projectId) && children}
        </div>
    )
}