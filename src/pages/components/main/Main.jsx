import Header from '../header/Header';
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
                    {children}
                </div>
            </section>
        </>
    )
}