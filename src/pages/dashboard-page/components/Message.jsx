import ProfileImg from '../../components/profile-img/ProfileImg'

export default function Message({ senderUsername, body, messageTime, senderProfileImg }) {
    return (
        <div className="message">
            <ProfileImg url={senderProfileImg} dim='2.3em' />
            <div className="message-info">
                <span className="sender-username">
                    {senderUsername}
                    <small className='message-time'>{messageTime}</small>
                </span>

                <p className='message-body'>{body}</p>
            </div>
        </div>
    )
}