import { Link } from 'react-router-dom'
import { useQueryClient, QueryCache } from 'react-query'
import ProfileImg from '../profile-img/ProfileImg'
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import './style.css'


export default function Header() {

    const queryClient = useQueryClient()
    const { currentUserId, currentUserUsername, currentUserProfileImg } = useCurrentUserData()

    const logout = () => {
        localStorage.removeItem('token')
        queryClient.invalidateQueries(['get-user'])
        queryClient.removeQueries()
    }

    return (
        <header>
            <div className="container">
                <input type="text" className="main-input search" placeholder="search" />
                <div className="user">
                    <Link to={`/user/${currentUserId}`} className="user-profile">
                        <ProfileImg url={currentUserProfileImg} />
                        <span>{currentUserUsername}</span>
                    </Link>
                    <button onClick={logout} className='main-button'>Logout</button>
                </div>
            </div>
        </header>
    )
}