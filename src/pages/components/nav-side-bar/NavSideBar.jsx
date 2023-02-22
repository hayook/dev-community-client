import { useState, useRef } from 'react'
import { useQueryClient } from 'react-query'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsQuestionSquare, BsFillFileEarmarkPostFill, BsCodeSquare } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi'
import ProfileImg from '../profile-img/ProfileImg'
import './style.css'
import ProfileFuncsModel from './components/ProfileFuncsModel'
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import { AiOutlineProject } from 'react-icons/ai'

export default function NavSideBar() {

    const profileFuncsModelButtonRef = useRef(null)

    const [profileFuncsModel, setProfileFuncsModel] = useState(false);

    const { pathname } = useLocation()

    const queryClient = useQueryClient()
    const { currentUserId, currentUserUsername, currentUserProfileImg } = useCurrentUserData()

    const logout = () => {
        localStorage.removeItem('token')
        queryClient.invalidateQueries(['get-user'])
        queryClient.removeQueries()
    }

    return (
        <nav className="nav-bar">
            <div className="inner-container">
                <div className="user-profile">
                    <Link to={`/user/${currentUserId}`}>
                        <ProfileImg dim='3.5em' url={currentUserProfileImg} />
                        <span>{currentUserUsername}</span>
                    </Link>
                    <button ref={profileFuncsModelButtonRef} onClick={() => setProfileFuncsModel(prev => !prev)}><HiDotsHorizontal /></button>
                    {profileFuncsModel &&
                        <ProfileFuncsModel
                            logout={logout}
                            buttonRef={profileFuncsModelButtonRef}
                            setProfileFuncsModel={setProfileFuncsModel}
                        />}
                </div>
                <ul>
                    <li><Link className={pathname === '/' ? 'active' : ''} to="/">
                        <AiOutlineHome />
                        <span>Home</span>
                    </Link></li>
                    <li><Link className={pathname === '/questions' ? 'active' : ''} to="/questions">
                        <BsQuestionSquare />
                        <span>Questions</span>
                    </Link></li>
                    <li><Link className={pathname === '/job-offers' ? 'active' : ''} to="/job-offers">
                        <BsFillFileEarmarkPostFill />
                        <span>Job Offers</span>
                    </Link></li>
                    <li><Link id="projects" className={pathname === '/projects' ? 'active' : ''} to="/projects">
                        <AiOutlineProject />
                    </Link></li>
                    {/* <li><Link className={pathname === '/projects' ? 'active' : ''} to="/projects">
                <BsCodeSquare />
                <span></span>
                </Link></li> */}
                </ul>
            </div>
        </nav>
    )
}