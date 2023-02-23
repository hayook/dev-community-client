import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query';
import useCurrentUserData from '../../../hooks/useCurrentUserData'
import { BiSend } from 'react-icons/bi'
import Message from '../components/Message'
import Spinner from '../../components/spinner/Spinner'
import useProjectChatLogs from '../../../hooks/useProjectChatLogs'
import { adjustInputHeight, updateQueryCache } from '../../../utiles/dom';
import { dateToHHMM } from '../../../utiles/handle-date'



export default function ProjectChat() {

    const messagesContent = useRef(null)
    const messageAreaRef = useRef(null)

    const { id: projectId } = useParams()
    const { currentUserId, currentUserProfileImg, currentUserUsername } = useCurrentUserData()

    const [messageBody, setMessageBody] = useState('')
    const [webSocket, setWebSocket] = useState(null)

    const { isLoading, data: response, error } = useProjectChatLogs(projectId)

    // Scroll down after new message
    useEffect(() => {
        if (messagesContent.current !== null) messagesContent.current.scrollTo({ top: messagesContent.current.scrollHeight });
    })

    const queryClient = useQueryClient()
    const query = `get-project-${projectId}-chat-logs`;

    // Create the connection
    useEffect(() => {
        const url = `ws://localhost:3000/ws/${projectId}`;
        const ws = new WebSocket(url);

        // ws.onopen = e => ws.send('Welcome user#' + memberId)

        ws.onmessage = e => {
            const payload = JSON.parse(e.data);

            const newMessage = {
                user_id: payload.user_id,
                username: payload.sender_username,
                img_url: payload.sender_profile_img,
                message: payload.message,
                message_date: payload.message_time,
            }

            const previousChatLogs = queryClient.getQueryData([query]); // to reset the data in case of an error

            updateQueryCache(queryClient, query, newMessage);
        }

        setWebSocket(ws);

        return () => ws.close()
    }, [])

    const sendMessage = e => {
        e.preventDefault()
        if (messageBody === '') return;
        const payload = {
            message: messageBody,
            senderUsername: currentUserUsername,
            senderProfileImg: currentUserProfileImg,
            senderId: currentUserId,
        }

        webSocket.send(JSON.stringify(payload));
        setMessageBody('')
        messageAreaRef.current.style.height = 'unset'
    }

    const handleTyping = ({ target }) => {
        adjustInputHeight(target)
        setMessageBody(target.value)
    }

    return (
        <div className="chat-content">
            <div className="messages" ref={messagesContent}>
                {isLoading ? <Spinner dim='30px' /> :
                    response?.data?.map((payload, idx) => {
                        return <Message
                            key={idx}
                            body={payload.message}
                            senderUsername={payload.username}
                            senderProfileImg={payload.img_url}
                            messageTime={dateToHHMM(payload.message_date)}
                        />
                    })
                }
            </div>
            <form onSubmit={sendMessage}>
                {/* <input className="main-input" type="text" value={messageBody} onChange={({ target }) => setMessageBody(target.value)} /> */}
                <textarea ref={messageAreaRef} rows={1} className='main-textarea' value={messageBody} onChange={handleTyping} />
                <button><BiSend /></button>
            </form>
        </div>
    )
}