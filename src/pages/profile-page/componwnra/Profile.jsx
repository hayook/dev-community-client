import ProfilePicture from './ProfilePicture'
import useUser from '../../../hooks/useUser'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'

export default function Profile() {

    const { id: userId } = useParams()

    const { isLoading, data: response, error } = useUser(userId)

    if (isLoading) return <Spinner dim='30px' />
    if (response?.ok && 'data' in response) return (
        <>
            <section className="hero">
                <ProfilePicture />
                <div className="basic-info">
                    <h2>
                        {response.data.first_name} {response.data.last_name}
                    </h2>
                    <span>{response.data.username}</span>
                </div>
                <nav>
                    <ul>
                        <li>Posts</li>
                        <li>Questions</li>
                        <li>Projects</li>
                        <li>About</li>
                    </ul>
                </nav>
            </section>
        </>
    )
    if (!response?.ok) return <h1>{response?.status}</h1>
    if (error) return <h1>Error [ error.message ]</h1>
}