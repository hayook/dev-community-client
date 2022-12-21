import ProjectMember from "./ProjectMember"

export default function MembersList({ membersList }) {
    return (
        <div className="members-list">
            {
                membersList.map(member => <ProjectMember key={member.userId} memberRole={member.userRole} memberId={member.userId} />)
            }
        </div>
    )
}