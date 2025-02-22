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
import Model from '../../components/model/Model'

export default function InviteMembers() {

    const { id: projectId } = useParams();
    const { isLoading, data: response, error } = useUsers(projectId);

    const [targetUser, setTargetUser] = useState(null);
    const [role, setRole] = useState('member')


    const handleSearch = ({ target }) => {
        setSearch(target.value);
        const temp = !!target.value ? recommandedMembers.filter(member => `user#${member.user_id}`.includes(target.value)) : response.data
        setRecommandedMembers(temp);
    }

    const insertToInvite = (member) => {
        setTargetUser(() => member);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const queryClient = useQueryClient()
    const { isLoading: isSending, mutate } = useMutation(inviteMember)
    const handleInvite = e => {
        e.preventDefault();
        const newMember = { username: targetUser?.username, role: role };
        mutate({ projectId, newMember }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-recommanded-users`])
                setTargetUser(null);
            }
        })
    }

    return (
        <div className={`invite-members`}>
            <div className="recommanded-members">
                {isLoading && <Spinner dim='30px' />}
                {response?.ok && response.data.length != 0 &&
                    <>
                        <div className="members-list recommanded-members-list">
                            {
                                response.data.map((member, idx) => {
                                    return <ProjectMember
                                        key={idx}
                                        memberUsername={member.username}
                                        memberImg={member.img_url}
                                        userId={member.user_id}
                                    >
                                        <div className="functionalities">
                                            <button onClick={() => insertToInvite(member)}>
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
                <Model closeModel={() => setTargetUser(() => false)}>
                    <div className="model-conatiner">
                        <form onSubmit={handleInvite} className="invite-member-form">
                            <ProjectMember
                                memberUsername={targetUser?.username}
                                userId={targetUser.user_id}
                                memberImg={targetUser.img_url}
                            />
                            <div className="roles">
                                <RadioButton value='admin' label='Admin' setValue={setRole} checked={role === 'admin'} />
                                <RadioButton value='member' label='Member' setValue={setRole} checked={role === 'member'} />
                            </div>
                            <div className="model-functionalities">
                                <button type="button" onClick={() => setTargetUser(() => false)} className="main-button cancel-button">Cancel</button>
                                <MainButton disabled={isSending}>Invite</MainButton>
                            </div>
                        </form>
                    </div>
                </Model>
            }
        </div>
    )
}