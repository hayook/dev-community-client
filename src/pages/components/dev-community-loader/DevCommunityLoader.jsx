import Spinner from '../spinner/Spinner'
import './style.css'

export default function DevCommunityLoader() {
    return (
        <div className="dev-community-loader">
            <h1>Dev Community</h1>
            <Spinner dim='35px' />
        </div>
    )
}