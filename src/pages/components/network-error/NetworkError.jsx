import './style.css'

export default function NetworkError({ refetch }) {
    return (
        <div className="network-error">
            <h2>Something wen't wrong</h2>
            <button onClick={() => refetch()} className="secondary-button">Retry</button>
        </div>
    )
}