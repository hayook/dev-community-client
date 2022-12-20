import { useState } from 'react'
import ProjectMember from "./ProjectMember";
import { projects } from '../../../trash/test-data'
const project = projects[0]

export default function InviteMembers() {

    const [targetUser, setTargetUser] = useState(null);

    const insertToInvite = (id) => {
        setTargetUser(true); 
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTargetUser(prev => ({ ...prev, id }))
    }

    const handleInvite = e => {
        e.preventDefault();
        setTargetUser(null);
    }

    return (
        <div className={`invite-members ${!!targetUser ? 'active' : ''}`}>
            <div className="recommanded-members">
                <input type="text" className='main-input' placeholder="Search" />
                    <h2>Recommanded Members To Invite</h2>
                <div className="members-list recommanded-members-list">
                    {
                        project.recommandedMembers.map(member => {
                            return <button onClick={() => insertToInvite(member.userId)}><ProjectMember memberId={member.userId}/></button>
                        })
                    }
                </div>
            </div>
            {!!targetUser &&
                <form onSubmit={handleInvite} className="invite-member-form">
                    <ProjectMember memberId={targetUser?.id} />
                    <input type="text" className='main-input' placeholder={`Title For usre#${targetUser?.id}`} />
                    <button className='main-button'>Invite</button>
                </form>
            }
        </div>
    )
}