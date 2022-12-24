import { useState } from 'react'
import ProjectMember from "./ProjectMember";
import RadioButton from '../../components/radio-button/RadioButton';
import useUsers from '../../../hooks/useUsers'
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner'
import { useMutation } from 'react-query';
import { inviteMember } from '../../../app/api'

export default function InviteMembers() {

    const { id: projectId } = useParams();
    const [recommandedMembers, setRecommandedMembers] = useState(null);
    const { isLoading:isSending, data: response, error } = useUsers(projectId, setRecommandedMembers);

    const [targetUser, setTargetUser] = useState(null);
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')


    const handleSearch = ({ target }) => {
        setSearch(target.value);
        const temp = !!target.value ? recommandedMembers.filter(member => `user#${member.user_id}`.includes(target.value)) : response.data
        setRecommandedMembers(temp);
    }

    const insertToInvite = (id, username) => {
        setTargetUser(true);
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTargetUser(prev => ({ ...prev, username, userId: id }))
    }

    const { isLoading, mutate } = useMutation(inviteMember)
    const handleInvite = e => {
        e.preventDefault();
        const newMember = { username: targetUser?.username }; 
        mutate({ projectId, newMember }, {
            onSuccess: res => {
                setTargetUser(null);
            }
        })
    }

    return (
        <div className={`invite-members ${!!targetUser ? 'active' : ''}`}>
            <div className="recommanded-members">
                {isLoading && <Spinner dim='30px' />}
                {recommandedMembers &&
                    <>
                        {/* <input onChange={handleSearch} type="text" className='main-input' value={search} placeholder="Search" /> */}
                        {/* {!search && <h2>Recommanded Members To Invite</h2>} */}
                        <div className="members-list recommanded-members-list">
                            {
                                recommandedMembers.map(member => {
                                    return <button key={member.user_id} onClick={() => insertToInvite(member.user_id, member.username)}><ProjectMember memberId={member.user_id} /></button>
                                })
                            }
                        </div>
                    </>
                }
            </div>
            {!!targetUser &&
                <form onSubmit={handleInvite} className="invite-member-form">
                    <ProjectMember memberId={targetUser?.userId} />
                    <input type="text" className='main-input' placeholder={`Title For ${targetUser?.username}`} />
                    <div className="roles">
                        <RadioButton value='admin' label='Admin' setValue={setRole} checked={role === 'admin'} />
                        <RadioButton value='member' label='Member' setValue={setRole} checked={role === 'member'} />
                    </div>
                    <button className='main-button' disabled={isSending}>{ isSending ? <Spinner /> : 'Invite' }</button>
                </form>
            }
        </div>
    )
}