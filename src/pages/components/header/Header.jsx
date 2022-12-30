import { Link } from 'react-router-dom'
import { useQueryClient, QueryCache } from 'react-query'
import ProfileImg from '../profile-img/ProfileImg'
import useUser from '../../../hooks/useUser'
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import './style.css'


export default function Header() {

    const queryClient = useQueryClient()
    const { username, img_url:profileImg } = useCurrentUserData()

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
                    <Link to='/user/8' className="user-profile">
                        <ProfileImg url={profileImg} />
                        <span>{username}</span>
                    </Link>
                    <button onClick={logout} className='main-button'>Logout</button>
                </div>
            </div>
        </header>
    )
}