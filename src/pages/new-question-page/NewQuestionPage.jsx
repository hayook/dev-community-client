import { useState, useRef } from "react"
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import ChipsInput from '../components/chips-input/ChipInput'
import { editPost, sharePost } from '../../app/api'
import Main from '../components/main/Main';
import MainButton from '../components/main-button/MainButton'
import { fullSpaces } from '../../lib/string';
import Model from '../components/model/Model'
import Show from '../components/show/Show'
import './style.css';

const techs = [{ id: 1, name: 'HTML' }, { id: 2, name: 'CSS' }, { id: 3, name: 'JAVASCRIPT' }, { id: 4, name: 'C++' }, { id: 5, name: 'GO' }, { id: 6, name: 'RUST' }, { id: 7, name: 'SQL' }, { id: 8, name: 'RUBY' }, { id: 9, name: 'DART' }, { id: 10, name: 'C#' }];

export default function NewQuestionPage() {

    const titleFieldRef = useRef(null);
    const descriptionFieldRef = useRef(null);
    const ulRef = useRef(null);
    const navigate = useNavigate();

    const [technologies, setTechnologies] = useState([]);
    const [selectedTech, setSelectedTech] = useState(null);
    const [postInfo, setPostInfo] = useState({
        title: '',
        description: '',
        questionCode: '',
        postType: 'question',
        technologies: []
    });
    const closeModel = () => setSelectedTech(null);
    const updatePostInfo = (key, value) => setPostInfo({ ...postInfo, [key]: value });

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
        };
        mutateShare(question, {
            onSuccess: res => navigate(`/questions/${res.data}`)
        })
    }

    const selectChip = chip => setSelectedTech(chip);
    const removeChip = id => {
        const s = technologies.filter(chip => chip.id !== id);
        setTechnologies(s);
    }

    const submitLevel = e => {
        if (e.target === ulRef.current) return;
        setTechnologies(prev => [...prev, { ...selectedTech, level: Number(e.target.getAttribute('target')) }])
        closeModel();
    }

    return (
        <Main>
            <Show when={selectedTech !== null}>
                <Model closeModel={closeModel}>
                    <div className="model-heading">
                        <h2>{selectedTech?.name}</h2>
                    </div>
                    <div className="model-container">
                        <ul ref={ulRef} className="importance-levels" onClick={submitLevel}>
                            <li className="level active" target="1">Low</li>
                            <li className="level" target="2">Intermediate</li>
                            <li className="level" target="3">Experienced</li>
                            <li className="level" target="4">High</li>
                            <li className="level" target="5">Expert</li>
                        </ul>
                    </div>
                </Model>
            </Show>

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
                    <lable>Code</lable>
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