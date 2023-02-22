import { Link } from 'react-router-dom'
import QuestionsList from './components/QuestionsList';
import Main from '../components/main/Main';
import NavSideBar from '../components/nav-side-bar/NavSideBar';
import WorkingRooms from '../components/working-rooms/WorkingRooms';
import './style.css';

export default function QuestionsPage() {
    return (
        <>
            <Main>
                <section className='questions-page'>
                    <div className="questions-page-container">
                        <section className="header">
                            <h1>Popular Questions</h1>
                            <Link to="/questions/new" className="secondary-button">Ask Question</Link>
                        </section>
                        <section className="filter-questions"></section>

                        <section className="questions-list">
                            <QuestionsList />
                        </section>
                    </div>
                </section>
            </Main>
            <WorkingRooms />
        </>
    )
}