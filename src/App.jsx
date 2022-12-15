import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import ShareYourWorkForm from './pages/share-your-work-form/ShareYourWorkForm';
import DevCommunityLoader from './components/dev-community-loader/DevCommunityLoader'
import Main from './pages/main/Main';
import Timeline from './pages/main/sections/timeline/Timeline';
import QuestionsPage from './pages/main/sections/questions-page/QuestionsPage';
import ProjectLinks from './pages/share-your-work-form/components/ProjectsLinks';
import QuestionPage from './pages/main/sections/questions-page/components/QuestionPage';
import QuestionCode from './pages/share-your-work-form/components/QuestionCode';
import TestComp from './trash/TestComp'
import useUser from './hooks/useUser';

const initialState = {
    title: '',
    description: '',
    technologies: []
}
const projectLinks = [{
    id: new Date().getTime(),
    type: 'Source Code',
    link: '',
}
]

export default function App() {

    const { isLoading, data: response, error } = useUser();

    if (isLoading) return <DevCommunityLoader />
    if (!!error) return <h1>Error : {error.message}</h1>
    if (response?.status !== 200) return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
        </Routes>
    )
    return (
        <Routes>
            <Route path="/" element={<Main><Timeline /></Main>} />
            <Route path="/questions" element={<Main><QuestionsPage /></Main>} />
            <Route path="/question-:id" element={<Main><QuestionPage /></Main>} />
            <Route path="/job-offers" element={<Main><h1>Job Offers</h1></Main>} />
            <Route path="/new-question" element={
                <ShareYourWorkForm initialState={{ ...initialState, questionCode: '', postType: 'question' }}>
                    <QuestionCode />
                </ShareYourWorkForm>
            } />
            <Route path="/edit-question-:id" element={
                <ShareYourWorkForm initialState={{ ...initialState, questionCode: '', postType: 'question' }}>
                    <QuestionCode />
                </ShareYourWorkForm>
            } />




            <Route path="/share-project" element={
                <ShareYourWorkForm initialState={{ ...initialState, projectLinks, postType: 'Project' }}>
                    <ProjectLinks />
                </ShareYourWorkForm>
            } />




            <Route path="/test" element={<TestComp />} />
            <Route path="*" element={<h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Not Found</h1>} />
        </Routes>

    )
}