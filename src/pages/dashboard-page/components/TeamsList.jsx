import { projects } from '../../../trash/test-data'

export default function TeamsList() {
    return (
        <div className="teams-list">
            { projects[0].projectTeams.map(team => <div className='project-team' key={team.id}>{ team.name }</div>)}
        </div>
    )
}