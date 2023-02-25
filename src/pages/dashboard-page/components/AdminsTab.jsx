import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import InviteMembers from './InviteMembers';
import { BiArrowBack } from 'react-icons/bi'
import ProjectMember from "./ProjectMember";
import { filterByRole } from '../../../utiles/filter-by-role';
import DeleteModel from '../../components/delete-model/DeleteModel'
import { removeProjectMember } from "../../../app/api";
import { BsTrash } from "react-icons/bs";
import { isAdmin } from '../../../utiles/is-admin'

export default function AdminsTab() {

    const { id: projectId } = useParams()
    const [addMemberForm, setAddMemberForm] = useState(false)
    const queryClient = useQueryClient()
    const membersList = queryClient.getQueryData([`get-project-${projectId}-members`]).data;
    const [memberToDelete, setMemberToDelete] = useState(null)

    const openModel = (memberid) => setMemberToDelete(memberid)
    const closeModel = () => setMemberToDelete(null)

    const { isLoading: isDeleting, mutate } = useMutation(removeProjectMember)
    const removeMemberHandler = () => {
        mutate({ projectId, memberId: memberToDelete }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-members`]);
                setMemberToDelete(null)
            }
        })
    }

    return (
        <>
            {!!memberToDelete &&
                <DeleteModel
                    modelHeading='Delete Member'
                    type='member'
                    cancelDelete={closeModel}
                    submitDelete={removeMemberHandler}
                    isDeleting={isDeleting}
                />
            }
            <div className="heading">
                <h2>Project Admins</h2>
                {isAdmin(queryClient, projectId) &&
                    (
                        addMemberForm ?
                            <button onClick={() => setAddMemberForm(false)} className='back-button'><BiArrowBack /></button>
                            :
                            <button onClick={() => setAddMemberForm(true)} className='main-button'>Invite</button>
                    )
                }
            </div>
            {addMemberForm ?
                <InviteMembers />
                :
                <div className='members-list'>
                    {filterByRole(membersList, 'admin').map(member => {
                        return <ProjectMember
                            key={member.user_id}
                            memberRole={member.member_role}
                            memberUsername={member.username}
                            userId={member.user_id}
                            memberImg={member.img_url}
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