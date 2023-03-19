import { useState } from 'react'
import useUser from '../../../hooks/useUser'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import { useRef } from 'react'
import { activateTab } from '../../../lib/dom'
import UserPosts from './UserPosts'
import UserQuestions from './UserQuestions'
import UserProjects from './UserProjects'
import ProfileImg from '../../components/profile-img/ProfileImg'
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import { NotFound } from '../../not-found-page/NotFoundPage'
import NetworkError from '../../components/network-error/NetworkError'

export default function Profile() {

    const [targetContent, setTargetContent] = useState('posts')
    const ulRef = useRef()
    const { id: userId } = useParams()
    const { currentUserId } = useCurrentUserData()

    const { isLoading, data: response, error, refetch } = useUser(userId)

    if (isLoading) return <div className="inner-center"><Spinner dim='30px' /></div>
    if (response?.ok && 'data' in response) return (
        <div className="profile-page">
            <div className='inner-container'>
                <section className="hero">
                    <div className="user-pic">
                        <ProfileImg
                            dim='150px'
                            url={response.data.img_url}
                        />
                    </div>
                    <div className="main">
                        <div className="basic-info">
                            <h2>{response.data.first_name} {response.data.last_name}</h2>
                            <span className="username">@{response.data.username}</span>
                        </div>
                        {Number(userId) === currentUserId &&
                            <Link to={`/user/${userId}/edit`} className='edit-profile'>Edit Profile</Link>
                        }
                        <nav>
                            <ul ref={ulRef} onClick={(e) => activateTab(ulRef, e, setTargetContent)} className='main-ul'>
                                <li className='active' target="posts">Posts</li>
                                <li target="questions">Questions</li>
                                <li target="projects">Projects</li>
                                <li target="about">About</li>
                            </ul>
                        </nav>
                    </div>
                </section>
                <section className='profile-content'>
                    <div className="profile-content-container">
                        {targetContent === 'posts' && <UserPosts />}
                        {targetContent === 'questions' && <UserQuestions />}
                        {targetContent === 'projects' && <UserProjects />}
                        {targetContent === 'about' && <p>{response.data.about}</p>}
                    </div>
                </section>
            </div>
        </div>
    )
    if (!response?.ok) return <div className="inner-center"><NotFound /></div>
    if (error) return <div className="inner-center"><NetworkError refetch={refetch} /></div>
}