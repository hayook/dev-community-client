import ProjectMember from "./ProjectMember"
import { projects } from '../../../trash/test-data';
import { filterByRole } from '../../../utiles/filter-by-role'

export default function MembersList({ filter }) {
    return (
        <div className="members-list">
            {
                filterByRole(projects[0].projectMembers, filter).map(member => <ProjectMember key={member.userId} memberRole={member.userRole} memberId={member.userId} />)
            }
        </div>
    )
}