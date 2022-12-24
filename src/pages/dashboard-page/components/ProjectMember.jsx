import ProfileImg from '../../components/profile-img/ProfileImg'

export default function ProjectMember({ memberId, memberRole }) {

    

    return (
        <div className="project-member">
            <ProfileImg />
            <span className='username'>user#{memberId}</span>
            { memberRole && <span className="user-role">{ memberRole.toUpperCase() }</span> }
        </div>
    )
}