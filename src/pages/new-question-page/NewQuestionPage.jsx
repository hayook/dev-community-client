import { useState, useRef } from "react"
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import ChipsInput from '../components/chips-input/ChipInput'
import { editPost, sharePost } from '../../app/api'
import Main from '../components/main/Main';
import MainButton from '../components/main-button/MainButton'
import { fullSpaces } from '../../lib/string';
import './style.css';

const techs = [{ id: 1, name: 'HTML' }, { id: 2, name: 'CSS' }, { id: 3, name: 'JAVASCRIPT' }, { id: 4, name: 'C++' }, { id: 5, name: 'GO' }, { id: 6, name: 'RUST' }, { id: 7, name: 'SQL' }, { id: 8, name: 'RUBY' }, { id: 9, name: 'DART' }, { id: 10, name: 'C#' }];

export default function NewQuestionPage() {

    const titleFieldRef = useRef(null);
    const descriptionFieldRef = useRef(null);
    const navigate = useNavigate();

    const [chips, setChips] = useState([]);
    const [postInfo, setPostInfo] = useState({
        title: '',
        description: '',
        questionCode: '',
        postType: 'question',
        technologies: []
    });
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

    const { mutate: mutateEdit, isLoading: isEditing } = useMutation(editPost);
    const submitEditQuestion = (e) => {
        e.preventDefault();
        const newQuestion = { post_title: postInfo.title, post_body: postInfo.description, post_code: postInfo.questionCode, post_type: 'question' }
        mutateEdit({ newPost: newQuestion, postId: id }, {
            onSuccess: res => navigate(`/questions/${res.data[0].post_id}`),
        })

    }

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
                        chips={chips}
                        setChips={setChips}
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