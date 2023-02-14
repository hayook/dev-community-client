import ProfileImg from '../profile-img/ProfileImg'
import { Link } from 'react-router-dom'
import './style.css';

export default function UserProfileShowcase({ userId, userImg, username, children }) {
    return (
        <div className="profile">
            <Link to={`/user/${userId}`}><ProfileImg url={userImg} /></Link>
            <p className="profile-username">{ username }</p>
            { children }
        </div>
    )
}