import { Link } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import ProfileImg from '../profile-img/ProfileImg'
import useUser from '../../../hooks/useUser'
import './style.css'


export default function Header() {

    const { refetch:refetchUser } = useUser()
    const queryClient = useQueryClient()
    const { username } = queryClient.getQueryData(['get-user']).data[0];


    const logout = () => {
        localStorage.removeItem('token')
        refetchUser()
    }

    return (
        <header>
            <div className="container">
                <input type="text" className="main-input search" placeholder="search" />
                <div className="user">
                    <Link to='/user/8' className="user-profile">
                        <ProfileImg />
                        <span>{username}</span>
                    </Link>
                    <button onClick={logout} className='main-button'>Logout</button>
                </div>
            </div>
        </header>
    )
}