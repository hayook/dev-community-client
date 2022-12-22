import { useState } from 'react';
import { projects } from '../../../trash/test-data'
import ProjectMember from './ProjectMember'
import { BiArrowBack } from 'react-icons/bi'
import MembersList from './MembersList'

export default function TeamsList() {

    const [teamMembers, setTeamMembers] = useState([]);
    const [addMemberToTeam, setAddMemberToTeam] = useState(false);

    const handleClick = () => { }

    const showTeamMembers = (id) => {
        setTeamMembers(projects[0].projectTeams.filter(team => team.id === id)[0].teamMembers);
    }

    return (
        <div className={`teams-list-container ${(teamMembers.length !== 0 && !addMemberToTeam) ? 'active' : ''}`}>
            {!addMemberToTeam &&
                <div className="teams-list">
                    {projects[0].projectTeams.map(team => <button onClick={() => showTeamMembers(team.id)}><div className='project-team' key={team.id}>{team.name}</div></button>)}
                </div>
            }
            {teamMembers.length !== 0 &&
                <div className={`team-members-list ${addMemberToTeam ? 'active' : ''}`}>
                    <div className="heading">
                        <h2>{ addMemberToTeam ? 'Add Member' : 'Team Members'}</h2>

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
                            {teamMembers.map(member => <ProjectMember memberId={member.userId} />)}
                        </div>
                    }
                </div>
            }
        </div>
    )
}