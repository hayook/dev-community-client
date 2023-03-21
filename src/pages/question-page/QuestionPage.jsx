import { useParams } from 'react-router-dom';
import Main from '../components/main/Main'
import Question from "./components/Question"
import Spinner from '../components/spinner/Spinner'
import useQuestion from '../../hooks/useQuestion'
import './style.css'
import { NotFound } from '../not-found-page/NotFoundPage';
import NetworkError from '../components/network-error/NetworkError';

export default function QuestionPage() {

    const { id: questionId } = useParams();

    const { isLoading, data: response, error } = useQuestion(questionId);

    if (isLoading) return <Main><div className="inner-center"><Spinner dim='30px' /></div></Main>
    if (!response?.ok) return <Main><NotFound /></Main>
    if (response?.ok && 'data' in response) return <Main>
        <Question
            questionId={questionId}
            questionTitle={response.data[0].post_title}
            questionBody={response.data[0].post_body}
            questionCode={response.data[0].post_code}
            questionCreationDate={response.data[0].post_creation_date}
            liked={response.data[0].liked === "true"}
            numberAnswers={response.data[0].post_number_comments}
            numberLikes={response.data[0].post_number_likes}
            questionOwnerId={response.data[0].post_owner_id}
            questionOwnerUsername={response.data[0].username}
            questionOwnerProfileImg={response.data[0].img_url}
            questionTechnologies={response?.data[0].post_skills}
        />
    </Main>
    return <Main><div className="inner-center"><NetworkError /></div></Main>

}