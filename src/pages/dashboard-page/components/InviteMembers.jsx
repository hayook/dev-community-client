import { useState } from 'react'
import ProjectMember from "./ProjectMember";
import { projects, users } from '../../../trash/test-data'
import RadioButton from '../../components/radio-button/RadioButton';
const project = projects[0]

export default function InviteMembers() {

    const [targetUser, setTargetUser] = useState(null);
    const [recommandedMembers, setRecommandedMembers] = useState(project.recommandedMembers);
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')

    const handleSearch = ({ target }) => {
        setSearch(target.value);
        const temp = !!target.value ? users.filter(member => `user#${member.userId}`.includes(target.value)) : project.recommandedMembers
        setRecommandedMembers(temp);
    }

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
                <input onChange={handleSearch} type="text" className='main-input' value={search} placeholder="Search" />
                {!search && <h2>Recommanded Members To Invite</h2>}
                <div className="members-list recommanded-members-list">
                    {
                        recommandedMembers.map(member => {
                            return <button onClick={() => insertToInvite(member.userId)}><ProjectMember memberId={member.userId} /></button>
                        })
                    }
                </div>
            </div>
            {!!targetUser &&
                <form onSubmit={handleInvite} className="invite-member-form">
                    <ProjectMember memberId={targetUser?.id} />
                    <input type="text" className='main-input' placeholder={`Title For usre#${targetUser?.id}`} />
                    <div className="roles">
                        <RadioButton value='admin' label='Admin' setValue={setRole} checked={role === 'admin'} />
                        <RadioButton value='member' label='Member' setValue={setRole} checked={role === 'member'} />
                    </div>
                    <button className='main-button'>Invite</button>
                </form>
            }
        </div>
    )
}