import { useState } from 'react'
import ProjectMember from "./ProjectMember";

export default function InviteMembers() {

    const [targetUser, setTargetUser] = useState(null);

    return (
        <div className={`invite-members ${!!targetUser ? 'active' : ''}`}>
            <div className="recommanded-members">
                <input type="text" className='main-input' placeholder="Search" />
                <div className="recommanded-members-list">
                    <h2>Recommanded Members To Invite</h2>
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                    <ProjectMember setTargetUser={setTargetUser} />
                </div>
            </div>
            {!!targetUser &&
                <form className="invite-member-form">
                    <label>Member Title</label>
                    <input type="text" className='main-input' />
                    <button className='main-button'>Invite</button>
                </form>
            }
        </div>
    )
}