import { Link } from 'react-router-dom'
import Main from '../components/main/Main'
import NavSideBar from '../components/nav-side-bar/NavSideBar'
import './style.css'

export default function NotFoundPage() {
    return (
        <Main>
            <NavSideBar />
            <NotFound />
        </Main>
    )
}

export function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <Link to='/' className='secondary-button'>Home</Link>
        </div>
    )
}