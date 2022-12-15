import Header from '../../sections/header/Header';
import NavSideBar from './sections/nav-side-bar/NavSideBar'
import WorkingRooms from './sections/working-rooms/WorkingRooms';
import { useParams } from 'react-router-dom';
import './style.css'

const re = new RegExp("/question-[0-9]+")

export default function Main({ children }) {

    const { id } = useParams();

    return (
        <>
            <Header />
            <section className="main">
                <div className="container">
                    <NavSideBar />
                    {children}
                    { !id && <WorkingRooms /> }
                </div>
            </section>
        </>
    )
}