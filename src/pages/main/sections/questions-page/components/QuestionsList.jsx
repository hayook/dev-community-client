import { useQuery } from 'react-query'
import { getQuestions } from '../../../../../app/api';
import Spinner from '../../../../../components/spinner/Spinner'
import Question from './Question'

export default function QuestionsList() {

    const response = useQuery(['get-questions'], getQuestions);

    if (response.isLoading) return <Spinner dim='30px' />
    if (response.error) return <h4>Error</h4>
    if (Object.keys(response.data).length === 0) return <h4>No Posts</h4>

    return (
        response.data.map(question => {
            const { title, body, id, nbrLikes, userId } = question; 
            return <Question key={id} body={body} title={title} id={id} questionOwner={userId} nbrLikes={nbrLikes} />
        })
    )
}