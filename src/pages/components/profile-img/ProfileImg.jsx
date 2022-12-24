import './style.css'

export default function ProfileImg({ url='http://127.0.0.1:5000/static/img/user.jpg', dim='3em' }) {
    return (
        <div className="profile-img" style={{ width: dim, height: dim }}>
            <img src={url} alt="" />
        </div>
    )
}