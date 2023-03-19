import { useParams } from 'react-router-dom'
import Main from '../components/main/Main'
import NavSideBar from '../components/nav-side-bar/NavSideBar'
import Project from './components/Project'
import './style.css'
import '../components/working-rooms/style.css' // Temp for the profile image styling

export default function DashboardPage() {

    const { id } = useParams()



    return (
        <Main>
            <Project id={id} />
        </Main>
    )
}