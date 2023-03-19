import { useParams } from 'react-router-dom';
import useQuestion from '../../hooks/useQuestion';
import Spinner from '../components/spinner/Spinner'
import { NotFound } from '../not-found-page/NotFoundPage'
import NetworkError from '../components/network-error/NetworkError'
import EditQuestionForm from './components/EditQuestionForm'
import Main from '../components/main/Main'
import useCurrentUserData from '../../hooks/useCurrentUserData';

export default function EditQuestionPage() {

    const { id: questionId } = useParams();
    const { currentUserId } = useCurrentUserData();

    const { isLoading, data: response } = useQuestion(questionId);

    if (isLoading) return <Main><div className="inner-center"><Spinner dim="30px" /></div></Main>
    if (response?.ok && 'data' in response) {
        if (response.data[0].post_owner_id !== currentUserId) return <Main><div className="inner-center"><NotFound /></div></Main>
        return <Main>
            <EditQuestionForm
                question={response.data[0]}
            />
        </Main>
    }
    if (!response?.ok) return <Main><div className="inner-center"><NotFound /></div></Main>
    return <Main><div className="inner-center"><NetworkError /></div></Main>
}