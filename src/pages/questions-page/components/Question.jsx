import { Link } from 'react-router-dom'

export default function Question({ questionId, questionTitle, questionDescription, nbrLikes, nbrAnswers }) {
    return (
        <Link to={`/questions/${questionId}`} className="question">
            <h2>{questionTitle}</h2>
            <p>{ questionDescription }</p>
            <div className="question-stats">
                <span>{nbrAnswers} Answers</span>
                <span>{ nbrLikes } Likes</span>
            </div>
        </Link>
    )
}