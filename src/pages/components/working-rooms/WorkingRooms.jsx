import { Link } from 'react-router-dom';
import './style.css'

export default function WorkingRooms() {
    return (
        <section className="working-rooms">
            <div className="working-rooms-container">
                <h2>Your Current Projects</h2>
                <div className="working-rooms-projects">
                    <Link to="/projects/1" className="working-rooms-project">
                        <div className="profile-img"></div>
                        <h4>This is an awesome project</h4>
                        <div className="progress">
                            <span>27%</span>
                            <div className="progress-container"><span style={{ width: '27%' }}></span></div>
                        </div>
                    </Link><Link to="/projects/2" className="working-rooms-project">
                        <div className="profile-img"></div>
                        <h4>This is an awesome project</h4>
                        <div className="progress">
                            <span>63%</span>
                            <div className="progress-container"><span style={{ width: '63%' }}></span></div>
                        </div>
                    </Link>
                </div>
                <button className="main-button">Start A New Project</button>
            </div>
        </section>
    )
}