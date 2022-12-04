import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import ShareYourWorkForm from './pages/share-your-work-form/ShareYourWorkForm'
import Main from './pages/main/Main';
import Timeline from './pages/main/sections/timeline/Timeline';
import ProjectLinks from './pages/share-your-work-form/components/ProjectsLinks';
import QuestionCode from './pages/share-your-work-form/components/QuestionCode';

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

    return (
        <Routes>
            <Route path="/" element={<Main><Timeline /></Main>} />

            <Route path="/questions" element={<Main><h1>Questions</h1></Main>} />

            <Route path="/projects" element={<Main><h1>Projects</h1></Main>} />

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