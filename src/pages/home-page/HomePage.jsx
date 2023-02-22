import WorkingRooms from '../components/working-rooms/WorkingRooms';
import SharePostSection from './components/SharePostSection';
import Posts from './components/Posts';
import './style.css'
import '../questions-page/style.css' // I forgot why this guy is in here
import Main from '../components/main/Main';

export default function HomePage() {
    return (
        <>
            <Main>
                <div className="home-page">
                    <div className="inner-container">
                        <SharePostSection />
                        <section className="posts">
                            <Posts />
                        </section>
                    </div>
                </div>
            </Main>
            <WorkingRooms />
        </>
    )
}