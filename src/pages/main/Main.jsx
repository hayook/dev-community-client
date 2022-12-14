import Header from '../../sections/header/Header';
import NavSideBar from './sections/nav-side-bar/NavSideBar'
import WorkingRooms from './sections/working-rooms/WorkingRooms';
import { useLocation } from 'react-router-dom';
import './style.css'

const re = new RegExp("/question-[0-9]+")

export default function Main({ children }) {

    const { pathname } = useLocation();

    return (
        <>
            <Header />
            <section className="main">
                <div className="container">
                    <NavSideBar />
                    {children}
                    { !pathname.includes('/question-') && <WorkingRooms /> }
                </div>
            </section>
        </>
    )
}