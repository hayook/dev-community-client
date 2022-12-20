import { useState } from 'react'
import ProjectMember from "./ProjectMember"
import InviteMembers from './InviteMembers';
import { BiArrowBack } from 'react-icons/bi'
import { projects } from '../../../trash/test-data';

export default function AllMembersTab() {

    const [addMemberForm, setAddMemberForm] = useState(false)

    return (
        <>
            <div className="heading">
                <h2>All Project Members</h2>
                {addMemberForm ?
                    <button onClick={() => setAddMemberForm(false)} className='back-button'><BiArrowBack /></button>
                    : 
                    <button onClick={() => setAddMemberForm(true)} className='main-button'>Invite</button>
                }
            </div>
            {addMemberForm ?
                <InviteMembers />
                :
                <div className="members-list">
                    {
                        projects[0].projectMembers.map(member => <ProjectMember key={member.userId} memberRole={member.userRole} memberId={member.userId} />)
                    }
                </div>
            }
        </>
    )
}