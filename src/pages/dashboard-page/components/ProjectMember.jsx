import ProfileImg from '../../components/profile-img/ProfileImg'

export default function ProjectMember({ memberUsername, memberRole, children }) {



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
            {children}
        </div>
    )
}