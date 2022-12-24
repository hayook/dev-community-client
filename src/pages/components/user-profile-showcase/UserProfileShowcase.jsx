import ProfileImg from '../profile-img/ProfileImg'
import './style.css';

export default function UserProfileShowcase({ userId, children }) {
    return (
        <div className="profile">
            <ProfileImg />
            <p className="profile-username">{`user#${userId}`}</p>
            { children }
        </div>
    )
}