import { Link } from 'react-router-dom'

export default function Question({ title, body, id, nbrLikes, userId }) {
    return (
        <Link to={`/question-${id}`} className="question">
            <h2>{title}</h2>
            <p>{ body }</p>
            <div className="question-info">
                <span>0 Answers</span>
                <span>{ nbrLikes } Likes</span>
            </div>
        </Link>
    )
}