export default function ProjectMember({ setTargetUser }) {

    const handleClick = () => {
        setTargetUser(true); 
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div onClick={handleClick} className="project-member">
            <div className="profile-img"></div>
            <span className='username'>user#id</span>
            <span className="user-role">Member</span>
        </div>
    )
}