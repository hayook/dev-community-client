import { useState } from 'react';
import ProjectMember from './ProjectMember'
import { BiArrowBack, BiSad } from 'react-icons/bi'
import { HiOutlineUserGroup } from 'react-icons/hi'
import TeamMembersList from './TeamMembersList'
import Spinner from '../../components/spinner/Spinner'
import useProjectTeams from '../../../hooks/useProjectTeams';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { addToTeam } from '../../../app/api'
import ProjectTeam from './ProjectTeam';
import DeleteModel from '../../components/delete-model/DeleteModel'
import { removeProjectTeam } from '../../../app/api'

export default function TeamsList() {

    const [targetTeam, setTargetTeam] = useState(null);
    const [addMemberToTeam, setAddMemberToTeam] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null)

    const openModel = (teamId) => setTeamToDelete(teamId)
    const closeModel = () => setTeamToDelete(null)

    const queryClient = useQueryClient()
    const { id: projectId } = useParams();
    const { isLoading, data: response, error } = useProjectTeams(projectId)

    const showtargetTeam = (id) => setTargetTeam(id)

    const { isLoading:isDeleting, mutate:mutateRemoveTeam } = useMutation(removeProjectTeam)
    const removeTeamHandler = () => {
        mutateRemoveTeam({ projectId, teamId: teamToDelete }, {
            onSuccess: res => {
                queryClient.invalidateQueries([`get-project-${projectId}-teams`])
                setTeamToDelete(null)
            }
        })
    }

    const { isLoading: isAdding, mutate } = useMutation(addToTeam)
    const addToTeamHandler = (memberId) => {
        mutate({ projectId, teamId: targetTeam, memberId })
    }

    if (isLoading) return <Spinner dim='30px' />
    if (response.ok && 'data' in response) {
        if (response.data.length === 0) return <p style={{ width: 'fit-content' }}>No Teams</p>
        return (
            <div className={`teams-list-container ${(!!targetTeam && !addMemberToTeam) ? 'active' : ''}`}>
                {!!teamToDelete &&
                    <DeleteModel
                        modelHeading='Remove Team'
                        type='team'
                        cancelDelete={closeModel}
                        submitDelete={removeTeamHandler}
                        isDeleting={isDeleting}
                    />
                }
                {!addMemberToTeam &&
                    <div className="teams-list">
                        {response.data.map(team => {
                            return <ProjectTeam key=
                                {team.team_id}
                                teamName={team.team_name}
                            >
                                <div className="functionalities">
                                    <button onClick={() => openModel(team.team_id)}><BsTrash /></button>
                                    <button onClick={() => showtargetTeam(team.team_id)}><HiOutlineUserGroup /></button>
                                </div>
                            </ProjectTeam>
                        })}
                    </div>
                }
                {!!targetTeam &&
                    <div className={`team-members-list ${addMemberToTeam ? 'active' : ''}`}>
                        <div className="heading">
                            <h2>{addMemberToTeam ? 'Add Member' : 'Team Members'}</h2>

                            {addMemberToTeam ?
                                <button onClick={() => setAddMemberToTeam(false)} className='back-button'><BiArrowBack /></button>
                                :
                                <button onClick={() => setAddMemberToTeam(true)} className='main-button'>Add Member</button>
                            }

                        </div>
                        {addMemberToTeam ?
                            <div className="search-members">
                                {queryClient.getQueryData([`get-project-${projectId}-members`]).data.map(member => {
                                    return <ProjectMember
                                        memberUsername={member.username}
                                        memberRole={member.member_role}
                                    >
                                        <div className="functionalities">
                                            <button onClick={() => addToTeamHandler(member.member_id)}>
                                                <AiOutlinePlus />
                                            </button>
                                        </div>
                                    </ProjectMember>
                                })}
                            </div>
                            :
                            <div className="members-list">
                                <TeamMembersList teamId={targetTeam} />
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
    if (!response?.ok) return <h1>{response.status}</h1>
    if (error) return <h1>Error {error.message}</h1>

}