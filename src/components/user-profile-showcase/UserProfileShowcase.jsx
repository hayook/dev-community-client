import './style.css';

export default function UserProfileShowcase({ userId }) {
    return (
        <div className="profile">
            <div className="profile-img"></div>
            <p className="profile-username">{`user#${userId}`}</p>
        </div>
    )
}