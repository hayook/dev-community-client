export default function ProjectMember({ memberId, memberRole }) {

    

    return (
        <div className="project-member">
            <div className="profile-img"></div>
            <span className='username'>user#{memberId}</span>
            { memberRole && <span className="user-role">{ memberRole.toUpperCase() }</span> }
        </div>
    )
}