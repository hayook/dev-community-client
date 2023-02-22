import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import RegisterPage from './pages/register-page/RegisterPage';
import HomePage from './pages/home-page/HomePage'
import QuestionsPage from './pages/questions-page/QuestionsPage';
import NewQuestionPage from './pages/new-question-page/NewQuestionPage'
import QuestionPage from './pages/question-page/QuestionPage';
import NotFoundPage from './pages/not-found-page/NotFoundPage'
import DevCommunityLoader from './pages/components/dev-community-loader/DevCommunityLoader'
import JobOffersPage from './pages/job-offers-page/JobOffersPage'
// import DashboardPage from './pages/dashboard-page/DashboardPage'
import NewProjectPage from './pages/new-project-page/NewProjectPage'
import EditProjectPage from './pages/edit-project-page/EditProjectPage'
import ProjectsPage from './pages/projects-page/ProjectsPage'
import ProfilePage from './pages/profile-page/ProfilePage'
import TestComp from './trash/TestComp'
import FlexComp from './trash/FlexComp'
import useCurrentUser from './hooks/useCurrentUser';
import { lazy, Suspense, useEffect } from 'react';
import DashboardPage from './pages/dashboard-page/DashboardPage'
import EditProfilePage from './pages/edit-profile-page/EditProfilePage'
import ProtectedPage from './pages/protected-page/ProtectedPage'
import NavSideBar from './pages/components/nav-side-bar/NavSideBar';

// const DashboardPage = lazy(() => import('./pages/dashboard-page/DashboardPage'))

export default function App() {

    const { isLoading, data: response, error, isRefetching } = useCurrentUser();

    if (isLoading) return <DevCommunityLoader />
    if (!!error) return <h1>Error : {error.message}</h1>
    if (response?.status !== 200) return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
        </Routes>
    )
    return (
        <div className="app">
            <NavSideBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="/questions/new" element={<NewQuestionPage />} />
                <Route path="/questions/:id" element={<QuestionPage />} />
                <Route path="/questions/:id/edit" element={<NewQuestionPage />} />
                <Route path="projects/new" element={<NewProjectPage />} />
                <Route path="/projects/:id/edit" element={<EditProjectPage />} />
                <Route path="/projects/:id" element={<DashboardPage />} />
                <Route path="/job-offers" element={<JobOffersPage />} />
                <Route path="/user/:id" element={<ProfilePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/user/:id/edit" element={<ProtectedPage><EditProfilePage /></ProtectedPage>} />
                <Route path="/test" element={<TestComp />} />
                <Route path="/flex" element={<FlexComp />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>

    )
}