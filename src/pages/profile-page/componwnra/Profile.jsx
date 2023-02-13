import { useState } from 'react'
import useUser from '../../../hooks/useUser'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import { useRef } from 'react'
import { activateTab } from '../../../utiles/dom'
import UserPosts  from './UserPosts'
import UserQuestions from './UserQuestions'
import UserProjects from './UserProjects'
import ProfileImg from '../../components/profile-img/ProfileImg'

export default function Profile() {

    const [targetContent, setTargetContent] = useState('posts')
    const ulRef = useRef()
    const { id: userId } = useParams()

    const { isLoading, data: response, error } = useUser(userId)

    if (isLoading) return <Spinner dim='30px' />
    if (response?.ok && 'data' in response) return (
        <>
            <section className="hero">
                <div className="user-pic">
                    <ProfileImg 
                        dim='150px'
                        url={response.data.img_url}
                    />
                </div>
                <div className="main">
                    <div className="basic-info">
                        <div className="user-name">
                            <h2>
                                {response.data.first_name} {response.data.last_name}
                            </h2>
                            <span className="username">@{response.data.username}</span>
                        </div>
                        <Link to={`/user/${userId}/edit`} className='main-button'>Edit Profile</Link>
                    </div>
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
                { targetContent === 'posts' && <UserPosts />}
                { targetContent === 'questions' && <UserQuestions />}
                { targetContent === 'projects' && <UserProjects />}
                { targetContent === 'about' && <p>about</p>}
            </section>
        </>
    )
    if (!response?.ok) return <h1>{response?.status}</h1>
    if (error) return <h1>Error [ error.message ]</h1>
}