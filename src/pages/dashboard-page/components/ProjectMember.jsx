import ProfileImg from '../../components/profile-img/ProfileImg'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { isAdmin } from '../../../utiles/is-admin'

export default function ProjectMember({ memberUsername, memberRole, children }) {

    const { id:projectId } = useParams()
    const queryClient = useQueryClient()

    return (
        <div className="project-member">
            <div className={`member-info ${memberRole ? 'role' : ''}`}>
                <ProfileImg />
                <span className='username'>
                    {memberUsername}
                </span>
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