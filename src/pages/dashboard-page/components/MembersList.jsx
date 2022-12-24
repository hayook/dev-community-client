import ProjectMember from "./ProjectMember"

export default function MembersList({ membersList }) {
    return (
        <div className="members-list">
            {
                membersList.map(member => <ProjectMember key={member.user_id} memberRole={member.member_role} memberId={member.user_id} />)
            }
        </div>
    )
}