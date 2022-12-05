import { useEffect } from 'react'
import SharePostSection from './components/SharePostSection';
import Posts from './components/Posts';
import './style.css'


export default function Timeline() {

    return (
        <section className="timeline">
            <div className="timeline-container">
                <SharePostSection />

                <section className="posts">
                    <Posts />
                </section>
            </div>
        </section>
    )
}