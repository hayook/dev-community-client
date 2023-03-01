import './style.css'

export default function ProgressBar({ progress }) {
    if (progress > 100) progress = 100;
    else if (progress < 0 || !progress) progress = 0;
    return (
        <main className="main-content">
            <div className="progress">
                <span>{progress}%</span>
                <div className="progress-container"><span style={{ width: `${progress}%` }}></span></div>
            </div>
        </main>
    )
}