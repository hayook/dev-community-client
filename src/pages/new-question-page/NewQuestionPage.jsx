import { useState, useRef, useMemo } from "react"
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import ChipsInput from '../components/chips-input/ChipInput'
import { editPost, sharePost } from '../../app/api'
import Main from '../components/main/Main';
import MainButton from '../components/main-button/MainButton'
import { fullSpaces } from '../../lib/string';
import Spinner from '../components/spinner/Spinner'
import useTechnologies from '../../hooks/useTechnologies'
import './style.css';

export default function NewQuestionPage() {

    const titleFieldRef = useRef(null);
    const descriptionFieldRef = useRef(null);
    const navigate = useNavigate();

    const [technologies, setTechnologies] = useState([]);
    const [postInfo, setPostInfo] = useState({
        title: '',
        description: '',
        questionCode: '',
        postType: 'question',
    });
    const updatePostInfo = (key, value) => setPostInfo({ ...postInfo, [key]: value });

    const { isLoading, data: response } = useTechnologies();
    const techs = useMemo(() => {
        if (!!response?.data) {
            return response?.data.map(tech => ({ id: tech.technology_id, name: tech.technology_name.toUpperCase() }))
        }
    }, [response])

    const { mutate: mutateShare, isLoading: isSharing } = useMutation(sharePost);
    const submitShareQuestion = (e) => {
        e.preventDefault();

        titleFieldRef.current.classList.remove('error-field');
        descriptionFieldRef.current.classList.remove('error-field');
        if (fullSpaces(postInfo.title)) {
            titleFieldRef.current.focus();
            titleFieldRef.current.classList.add('error-field');
            return;
        }

        if (fullSpaces(postInfo.description)) {
            descriptionFieldRef.current.focus();
            descriptionFieldRef.current.classList.add('error-field');
            return;
        }

        const question = {
            post_title: postInfo.title,
            post_body: postInfo.description,
            post_code: postInfo.questionCode,
            post_type: postInfo.postType,
            post_skills: technologies.map(tech => tech.id),
        };
        mutateShare(question, {
            onSuccess: res => navigate(`/questions/${res.data}`)
        })
    }

    const selectChip = chip => setTechnologies(prev => [...prev, chip])
    const removeChip = id => setTechnologies(prev => prev.filter(chip => chip.id !== id));

    if (isLoading) return <Main><div className="inner-center"><Spinner dim="30px" /></div></Main>
    return (
        <Main>
            <form onSubmit={submitShareQuestion} className="share-work-form secondary-form">
                <label>Title</label>
                <input
                    ref={titleFieldRef}
                    onChange={({ target }) => updatePostInfo('title', target.value)}
                    type="text"
                    className='main-input'
                    value={postInfo.title}
                />

                <label>Description</label>
                <textarea
                    ref={descriptionFieldRef}
                    onChange={({ target }) => updatePostInfo('description', target.value)}
                    className='main-textarea'
                    rows={7}
                    value={postInfo.description}
                ></textarea>

                <div className="question-code">
                    <label>Code</label>
                    <textarea
                        className="main-textarea code"
                        value={postInfo.questionCode}
                        onChange={({ target }) => updatePostInfo('questionCode', target.value)}
                        rows={7}
                    ></textarea>
                </div >

                <div className="project-technologies">
                    <h3>Technologies</h3>
                    <ChipsInput
                        placeholder={"eg. C++, Go"}
                        options={techs}
                        chips={technologies}
                        onSelect={selectChip}
                        onRemove={removeChip}
                    />
                </div>

                <div className="functionalities">
                    <button className="main-button cancel-button" onClick={() => navigate(`/questions/`)}>Cancel</button>
                    <MainButton disabled={isSharing}>Submit</MainButton>
                </div>
            </form>
        </Main >
    )
}