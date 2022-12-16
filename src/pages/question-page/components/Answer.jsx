import UserProfileShowcase from '../../components/user-profile-showcase/UserProfileShowcase';
import Code from '../../components/code/Code'

export default function Answer({ answerOwnerId, answerDescription, answerCode }) {
    return (
        <div className="question-answer">
            <UserProfileShowcase userId={answerOwnerId}/>
            <p className="answer-description">{answerDescription}</p>
            <Code language='javascript' code={answerCode} />
            
        </div>
    )
}