import { Children } from "react";

export default function ProjectTeam({ teamName, children }) {
    return (
        <div className='project-team'>
            <div className="team-info">
                { teamName }
            </div>
            {children}
        </div>
    )
}