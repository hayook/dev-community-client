import { useState } from 'react';
import { projects } from '../../../trash/test-data'
import ProjectMember from './ProjectMember'
import { BiArrowBack } from 'react-icons/bi'
import MembersList from './MembersList'
import TeamMembersList from './TeamMembersList'

export default function TeamsList({ membersList }) {

    const [targetTeam, setTargetTeam] = useState(null);
    const [addMemberToTeam, setAddMemberToTeam] = useState(false);

    const showtargetTeam = (id) => {
        // setTargetTeam(projects[0].projectTeams.filter(team => team.id === id)[0].targetTeam);
        setTargetTeam(id)
    }

    return (
        <div className={`teams-list-container ${(!!targetTeam && !addMemberToTeam) ? 'active' : ''}`}>
            {!addMemberToTeam &&
                <div className="teams-list">
                    {membersList.map(team => <button onClick={() => showtargetTeam(team.team_id)}><div className='project-team' key={team.team_id}>{team.team_name}</div></button>)}
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
                            <input type="text" className="main-input" placeholder='search' />
                            <MembersList membersList={projects[0].projectMembers} />
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