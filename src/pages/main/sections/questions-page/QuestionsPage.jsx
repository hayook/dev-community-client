import { Link } from 'react-router-dom'
import './style.css';
import QuestionsList from './components/QuestionsList';

export default function QuestionsPage() {
    return (
        <section className='questions-page'>
            <div className="questions-page-container">
                <section className="header">
                    <h1>Popular Questions</h1>
                    <Link to="/new-question" className="secondary-button">Ask Question</Link>
                </section>
                <section className="filter-questions"></section>

                <section className="questions-list">
                    <QuestionsList />
                </section>
            </div>
        </section>
    )
}