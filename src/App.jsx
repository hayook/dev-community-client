import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import RegisterPage from './pages/register-page/RegisterPage';
import HomePage from './pages/home-page/HomePage'
import QuestionsPage from './pages/questions-page/QuestionsPage';
import NewQuestionPage from './pages/new-question-page/NewQuestionPage'
import QuestionPage from './pages/question-page/QuestionPage';
import NotFoundPage from './pages/not-found-page/NotFoundPage'
import DevCommunityLoader from './pages/components/dev-community-loader/DevCommunityLoader'
import JobOffersPage from './pages/job-offers-page/JobOffersPage'
import DashboardPage from './pages/dashboard-page/DashboardPage'
import NewProjectPage from './pages/new-project-page/NewProjectPage'
import ProfilePage from './pages/profile-page/ProfilePage'
import TestComp from './trash/TestComp'
import useUser from './hooks/useUser';
import EditProjectPage from './pages/edit-project-page/EditProjectPage'

export default function App() {

    
    const { isLoading, data: response, error, isRefetching } = useUser();
    
    if (isLoading) return <DevCommunityLoader />
    if (!!error) return <h1>Error : {error.message}</h1>
    if (response?.status !== 200) return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
        </Routes>
    )
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/questions/new" element={<NewQuestionPage />}/>
            <Route path="/questions/:id" element={<QuestionPage />} />
            <Route path="/questions/:id/edit" element={<NewQuestionPage />} />
            <Route path="projects/new" element={<NewProjectPage />} />
            <Route path="/projects/:id/edit" element={<EditProjectPage />} />
            <Route path="/projects/:id" element={<DashboardPage />} />
            <Route path="/job-offers" element={<JobOffersPage />} />
            <Route path="/user/8" element={<ProfilePage />} />
            <Route path="/test" element={<TestComp />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>

    )
}