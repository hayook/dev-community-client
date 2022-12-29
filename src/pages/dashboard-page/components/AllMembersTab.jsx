import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import InviteMembers from './InviteMembers';
import { BiArrowBack } from 'react-icons/bi'
import ProjectMember from "./ProjectMember";
import { BsTrash } from "react-icons/bs";
import { removeProjectMember } from "../../../app/api";
import DeleteModel from '../../components/delete-model/DeleteModel'

export default function AllMembersTab() {

    const { id: projectId } = useParams();
    const [addMemberForm, setAddMemberForm] = useState(false)
    const queryClient = useQueryClient()
    const membersList = queryClient.getQueryData([`get-project-${projectId}-members`]).data;
    const { member_role: currentUserRole } = queryClient.getQueryData([`get-project-${projectId}`]).data[0]
    const [memberToDelete, setMemberToDelete] = useState(null)

    const openModel = (memberId) => setMemberToDelete(memberId)
    const closeModel = () => setMemberToDelete(null)

    const { isLoading: isDeleting, mutate } = useMutation(removeProjectMember)
    const removeMemberHandler = () => {
        mutate({ projectId, memberId:memberToDelete }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-members`])
                setMemberToDelete(null)
            }
        })
    }

    return (
        <>
            {!!memberToDelete &&
                <DeleteModel
                    modelHeading='Remove Member'
                    type='member'
                    cancelDelete={closeModel}
                    submitDelete={removeMemberHandler}
                    isDeleting={isDeleting}
                />
            }
            <div className="heading">
                <h2>All Members</h2>
                {addMemberForm ?
                    <button onClick={() => setAddMemberForm(false)} className='back-button'><BiArrowBack /></button>
                    :
                    <button onClick={() => setAddMemberForm(true)} className='main-button'>Invite</button>
                }
            </div>
            {addMemberForm ?
                <InviteMembers />
                :
                <div className='members-list'>
                    {membersList.map(member => {
                        return <ProjectMember
                            key={member.user_id}
                            memberRole={member.member_role}
                            memberUsername={member.username}
                        >
                            <div className="functionalities">
                                <button onClick={() => openModel(member.member_id)}><BsTrash /></button>
                            </div>
                        </ProjectMember>
                    })}
                </div>
            }
        </>
    )
}