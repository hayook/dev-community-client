import { useState, useRef } from 'react'
import ProjectTechnology from './ProjectTechnology';
import { useNewQuestionContext } from '../NewQuestionPage';


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
        
    )
}