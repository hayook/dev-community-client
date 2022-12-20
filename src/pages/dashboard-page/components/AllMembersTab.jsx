import { useState } from 'react'
import InviteMembers from './InviteMembers';
import { BiArrowBack } from 'react-icons/bi'
import MembersList from './MembersList'

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
                <MembersList filter='all' />
            }
        </>
    )
}