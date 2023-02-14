import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import TeamsList from './TeamsList'
import { BiArrowBack } from 'react-icons/bi'
import Spinner from '../../components/spinner/Spinner';
import { useParams } from 'react-router-dom';
import { createTeam } from '../../../app/api'
import { isAdmin } from '../../../utiles/is-admin'
import MainButton from '../../components/main-button/MainButton'


export default function TeamsTab() {

    const [teamInfo, setTeamInfo] = useState({ teamName: '' })
    const { id: projectId } = useParams();
    const [createTeamForm, setCreateTeamForm] = useState(false);

    const queryClient = useQueryClient()
    const { isLoading: isCreating, mutate } = useMutation(createTeam)
    const nadleSubmit = e => {
        e.preventDefault();
        const team = { team_name: teamInfo.teamName }
        mutate({ team, projectId }, {
            onSuccess: (res) => {
                queryClient.invalidateQueries([`get-project-${projectId}-teams`]);
                setCreateTeamForm(false)
                setTeamInfo(prev => ({ ...prev, teamName: '' }))
            }
        })

    }

    return (
        <>
            <div className="heading">
                <h2>Project Teams</h2>
                {isAdmin(queryClient, projectId) &&
                    (
                        createTeamForm ?
                            <button onClick={() => setCreateTeamForm(false)} className='back-button'><BiArrowBack /></button>
                            :
                            <button onClick={() => setCreateTeamForm(true)} className='main-button'>Create Team</button>
                    )
                }
            </div>
            {createTeamForm ?
                <form onSubmit={nadleSubmit} className="create-team-form">
                    <label>Team Name</label>
                    <input onChange={({ target }) => setTeamInfo(prev => ({ ...prev, teamName: target.value }))} type="text" className="main-input" value={teamInfo.teamName} />
                    <MainButton disabled={isCreating}>Submit</MainButton>
                </form>
                :
                <TeamsList />

            }
        </>
    )
}