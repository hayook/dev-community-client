import { useState } from 'react';
import { useShareSpecialPostContext } from '../ShareYourWorkForm';

import ProjectLink from './ProjectLink';

export default function ProjectLinks() {

    const { postInfo, updatePostInfo } = useShareSpecialPostContext()

    const addLink = (e) => {
        e.preventDefault();
        const temp = [...postInfo.projectLinks];
        temp.push({ type: 'New Link', link: '', id: new Date().getTime() })
        updatePostInfo('projectLinks', temp);
    }

    return (
        <div className="project-links">
            <h3>Project Links</h3>
            {
                postInfo.projectLinks.map(({ type, link, id }) => <ProjectLink key={id} id={id} type={type} link={link} />)
            }
            <button onClick={addLink} className="add-link-button">New Link</button>
        </div>
    )
}