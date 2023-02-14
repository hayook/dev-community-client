import { useState } from 'react'
import ProjectMember from "./ProjectMember";
import RadioButton from '../../components/radio-button/RadioButton';
import useUsers from '../../../hooks/useUsers'
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner'
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { inviteMember } from '../../../app/api'
import { BsChevronRight } from 'react-icons/bs'
import MainButton from '../../components/main-button/MainButton'

export default function InviteMembers() {

    const { id: projectId } = useParams();
    const { isLoading, data: response, error } = useUsers(projectId);

    const [targetUser, setTargetUser] = useState(null);
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')


    const handleSearch = ({ target }) => {
        setSearch(target.value);
        const temp = !!target.value ? recommandedMembers.filter(member => `user#${member.user_id}`.includes(target.value)) : response.data
        setRecommandedMembers(temp);
    }

    const insertToInvite = (memberId, username) => {
        setTargetUser({ username, memberId });
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    const queryClient = useQueryClient()
    const { isLoading: isSending, mutate } = useMutation(inviteMember)
    const handleInvite = e => {
        e.preventDefault();
        const newMember = { username: targetUser?.username };
        mutate({ projectId, newMember }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-recommanded-users`])
                setTargetUser(null);
            }
        })
    }

    return (
        <div className={`invite-members ${!!targetUser ? 'active' : ''}`}>
            <div className="recommanded-members">
                {isLoading && <Spinner dim='30px' />}
                {response?.ok && response.data.length != 0 &&
                    <>
                        {/* <input onChange={handleSearch} type="text" className='main-input' value={search} placeholder="Search" /> */}
                        {/* {!search && <h2>Recommanded Members To Invite</h2>} */}
                        <div className="members-list recommanded-members-list">
                            {
                                response.data.map(member => {
                                    return <ProjectMember
                                    memberUsername={member.username}
                                    memberImg={member.img_url}
                                    memberId={member.user_id}
                                    >
                                        <div className="functionalities">
                                            <button onClick={() => insertToInvite(member.member_id, member.username)}>
                                                <BsChevronRight />
                                            </button>
                                        </div>
                                    </ProjectMember>
                                })
                            }
                        </div>
                    </>
                }
            </div>
            {!!targetUser &&
                <form onSubmit={handleInvite} className="invite-member-form">
                    <ProjectMember memberUsername={targetUser?.username} />
                    <input type="text" className='main-input' placeholder={`Title For ${targetUser?.username}`} />
                    <div className="roles">
                        <RadioButton value='admin' label='Admin' setValue={setRole} checked={role === 'admin'} />
                        <RadioButton value='member' label='Member' setValue={setRole} checked={role === 'member'} />
                    </div>
                    <MainButton disabled={isSending}>Invite</MainButton>
                </form>
            }
        </div>
    )
}