import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import ShareYourWorkForm from './pages/share-your-work-form/ShareYourWorkForm';
import DevCommunityLoader from './components/dev-community-loader/DevCommunityLoader'
import Main from './pages/main/Main';
import Timeline from './pages/main/sections/timeline/Timeline';
import QuestionsPage from './pages/main/sections/questions-page/QuestionsPage';
import ProjectLinks from './pages/share-your-work-form/components/ProjectsLinks';
import QuestionCode from './pages/share-your-work-form/components/QuestionCode';
import { useQuery } from 'react-query';
import { useGlobalState } from './app/GlobalStateProvider';
import { ACTIONS } from './app/actions';
import { getCurrentUser } from './app/api';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode';

const initialState = {
    title: '',
    description: '',
    technologies: [],
}
const projectLinks = [{
    id: new Date().getTime(),
    type: 'Source Code',
    link: '',
}
]

export default function App() {

    const [isReady, setIsReady] = useState(false);
    const { dispatch, state } = useGlobalState();
    const { token } = localStorage;

    useEffect(() => {
        if (token) {
            const { user_id:userId } = jwt(token);
            fetch(`http://localhost:3000/users/${userId}`)
            .then(res => res.json())
            .then(user => {
                dispatch({ type: ACTIONS.SET_USER, payload: user }); 
                setIsReady(true); 
            });
        } else {
            setIsReady(true)
        }
    }, [token]);


    if (!isReady) return <DevCommunityLoader />
    // if (reponse.isLoading || !state.user) return  <DevCommunityLoader />
    // if (response.error) return <h1>Error</h1>

    if (!state.user) return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
        </Routes>
    )

    return (
        <Routes>
            <Route path="/" element={<Main><Timeline /></Main>} />

            <Route path="/questions" element={<Main><QuestionsPage /></Main>} />

            {/* <Route path="/projects" element={<Main><h1>Projects</h1></Main>} /> */}

            <Route path="/job-offers" element={<Main><h1>Job Offers</h1></Main>} />

            <Route path="/share-project" element={
                <ShareYourWorkForm initialState={{ ...initialState, projectLinks, postType: 'Project' }}>
                    <ProjectLinks />
                </ShareYourWorkForm>
            } />

            <Route path="/new-question" element={
                <ShareYourWorkForm initialState={{ ...initialState, questionCode: '', postType: 'Question' }}>
                    <QuestionCode />
                </ShareYourWorkForm>
            } />

            <Route path="/project-id" element={<h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Comming Soon ...</h1>} />

            <Route path="*" element={<h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Not Found</h1>} />
        </Routes>

    )
}