import { useState } from 'react'
import { useParams } from "react-router-dom";
import useTeamMembers from "../../../hooks/useTeamMembers";
import Spinner from '../../components/spinner/Spinner'
import ProjectMember from './ProjectMember'
import { BsTrash } from 'react-icons/bs'
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { removeTeamMember } from '../../../app/api'
import DeleteModel from '../../components/delete-model/DeleteModel'


export default function TeamMembersList({ teamId }) {

    const { id: projectId } = useParams()
    const [memberToDelete, setMemberToDelete] = useState(null)

    const openModel = (memberId) => setMemberToDelete(memberId)
    const closeModel = () => setMemberToDelete(null)

    const queryClient = useQueryClient()
    const { isLoading: isDeleting, mutate } = useMutation(removeTeamMember)
    const removeTeamMemberHandler = () => {
        mutate({ projectId, teamId, memberId: memberToDelete }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-team-${teamId}-members`])
                closeModel()
            }
        })
    }

    const { isLoading, data: response, error } = useTeamMembers(projectId, teamId);
    if (isLoading) return <Spinner dim='30px' />
    if (response?.ok && 'data' in response) {
        if (response.data?.length == 0) return <p style={{ marginInline: 'auto' }}>No Members</p>
        return (
            <>
                {!!memberToDelete &&
                    <DeleteModel
                        modelHeading='Remove Team Member'
                        type='member'
                        cancelDelete={closeModel}
                        submitDelete={removeTeamMemberHandler}
                        isDeleting={isDeleting}
                    />
                }
                {response.data.map((member, idx) => {
                    return <ProjectMember
                        key={idx}
                        memberUsername={member.username}
                        memberRole={member.member_role}
                    >
                        <div className="functionalities">
                            <button onClick={() => openModel(member.member_id)}><BsTrash /></button>
                        </div>
                    </ProjectMember>
                })}
            </>
        )
    }
    if (!response?.ok) return <h1>{response.status}</h1>
    if (error) return <h1>Error {error.message}</h1>
}