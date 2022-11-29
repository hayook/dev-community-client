import UserProfileShowcase from '../../components/user-profile-showcase/UserProfileShowcase'
import './style.css'


export default function Header() {
    return (
        <header>
            <div className="container">
                <input type="text" className="main-input search" placeholder="search" />
                <UserProfileShowcase />
            </div>
        </header>
    )
}