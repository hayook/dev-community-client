import { useState, useRef } from 'react'
import ProjectTechnology from './ProjectTechnology';
import { useNewQuestionContext } from '../NewQuestionPage';

function showTech(input, str) {
    str = str.toLowerCase().trim();
    input = input.toLowerCase().trim();
    const chars = input.split('')
    for (let i = 0; i < chars.length; i++) {
        if (str.includes(chars[i])) {
            return true;
        }
    }
    return false;
}

export default function ProjectTechnologies() {

    const { postInfo, updatePostInfo } = useNewQuestionContext();

    const [suggestedTechnologies, setSuggestedTechnologies] = useState([]);
    const [technologiesInput, setTechnologiesInput] = useState('');

    const inputTagsRef = useRef(null);

    const handleTechnologiesInput = ({ target }) => {
        setTechnologiesInput(target.value);
        // setSuggestedTechnologies(TECHNOLOGIES.filter(tech => showTech(target.value, tech.name) && !postInfo.technologies.includes(tech)));
    }

    const addToTags = (id) => {
        const target = suggestedTechnologies.filter(tech => tech.id === id)[0];
        suggestedTechnologies.length = 0;
        updatePostInfo('technologies', [...postInfo.technologies, target]);
        setTechnologiesInput('');
        inputTagsRef.current.focus();
    }

    const removeFromTags = (id) => {
        updatePostInfo('technologies', postInfo.technologies.filter(tech => tech.id !== id));
        inputTagsRef.current.focus();
    }

    return (
        <div className="project-technologies">
            <h3>Technologies</h3>
            <div className="project-technologies-container">
                <div className="technologies-tags">
                    {
                        postInfo.technologies.map(tech =>
                            <ProjectTechnology key={tech.id} name={tech.name} id={tech.id} removeFromTags={removeFromTags} />
                        )
                    }
                    <input ref={inputTagsRef} onChange={handleTechnologiesInput} value={technologiesInput} type="text" className="main-input" placeholder="e.g. C++, Go..." />
                </div>
                {
                    suggestedTechnologies.length !== 0 &&
                    <div className="suggested-techs">
                        <ul>
                            {suggestedTechnologies.map(tech => <li onClick={() => addToTags(tech.id)} key={tech.id}>{tech.name}</li>)}
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}