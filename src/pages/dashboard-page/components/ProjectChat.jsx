import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import { BiSend } from 'react-icons/bi'
import Message from '../components/Message'



export default function ProjectChat() {

    const messagesContent = useRef(null)
    const { id: projectId } = useParams()
    const { currentUserId, currentUserProfileImg, currentUserUsername } = useCurrentUserData()

    const [payloads, setPayloads] = useState([])
    const [messageBody, setMessageBody] = useState('')
    const [webSocket, setWebSocket] = useState(null)

    // Scroll down after new message
    useEffect(() => messagesContent.current.scrollTo({ top: messagesContent.current.scrollHeight }))

    // Create the connection once
    useEffect(() => {
        const url = `ws://localhost:3000/ws/${projectId}`;
        const ws = new WebSocket(url);
        // ws.onopen = e => ws.send('Welcome user#' + memberId)
        setWebSocket(ws)

        return () => ws.close()
    }, [])

    useEffect(() => {
        if (webSocket !== null) {
            webSocket.onmessage = e => {
                const payload = JSON.parse(e.data);
                const allMessages = [...payloads, payload]
                setPayloads(allMessages)
            };
        }
    }, [webSocket, payloads])

    const sendMessage = e => {
        e.preventDefault()
        const payload = {
            message: messageBody, 
            senderUsername:  currentUserUsername,
            senderProfileImg: currentUserProfileImg,
	    senderId: currentUserId,
        }
        webSocket.send(JSON.stringify(payload));
        setMessageBody('');
    }

    return (
        <section className="chat-container">
            <div className="chat-content">
                <div className="messages" ref={messagesContent}>
                    {payloads.map((payload, idx) => {
                        return <Message 
                        key={idx} 
                        body={payload.message} 
                        senderUsername={payload.sender_username}
                        senderProfileImg={payload.sender_profile_img}
                        messageTime={payload.message_time}
                        />
                    })}
                </div>
                <form onSubmit={sendMessage}>
                    <input className="main-input" type="text" value={messageBody} onChange={({ target }) => setMessageBody(target.value)} />
                    <button><BiSend /></button>
                </form>
            </div>
        </section>
    )
}