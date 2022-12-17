import ProjectMember from './ProjectMember'

export default function ProjectMembers() {
    return (
        <>
        <h1>Members</h1>
            <ul className="members-roles">
                <li>All Members</li>
                <li>Admins</li>
                <li>Teams</li>
            </ul>
            <div className="members-list">
                <ProjectMember />
                <ProjectMember />
                <ProjectMember />
                <ProjectMember />
                <ProjectMember />
                <ProjectMember />
                <ProjectMember />
            </div>
        </>
    )
}