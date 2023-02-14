import UserProfileShowcase from '../../components/user-profile-showcase/UserProfileShowcase';
import Code from '../../components/code/Code'

export default function Answer({ answerOwnerId, answerDescription, answerOwnerImg, username, answerCode }) {
    return (
        <div className="question-answer">
            <UserProfileShowcase userId={answerOwnerId} username={username} userImg={answerOwnerImg} />
            <p className="answer-description">{answerDescription}</p>
            <Code language='javascript' code={answerCode} />
            
        </div>
    )
}