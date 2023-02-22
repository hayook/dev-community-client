import Main from '../components/main/Main'
import NavSideBar from '../components/nav-side-bar/NavSideBar'
import Profile from './componwnra/Profile'
import './style.css'

export default function ProfilePage() {



    return (
        <Main>
            <div className="profile-page page">
                <Profile />
            </div>
        </Main>
    )
}