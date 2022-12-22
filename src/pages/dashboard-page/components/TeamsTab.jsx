import { useState } from 'react'
import TeamsList from './TeamsList'
import { BiArrowBack } from 'react-icons/bi'
import ProjectMember from './ProjectMember'


export default function TeamsTab() {

    const [createTeamForm, setCreateTeamForm] = useState(false);

    return (
        <>
            <div className="heading">
                <h1>Project Teams</h1>
                {createTeamForm ?
                    <button onClick={() => setCreateTeamForm(false)} className='back-button'><BiArrowBack /></button>
                    :
                    <button onClick={() => setCreateTeamForm(true)} className='main-button'>Create Team</button>
                }
            </div>
            {createTeamForm ?
                <form className="create-team-form">
                    <label>Team Name</label>
                    <input type="text" className="main-input" />
                    <button className='main-button'>Submit</button>
                </form>
                :
                <TeamsList />
            }
        </>
    )
}