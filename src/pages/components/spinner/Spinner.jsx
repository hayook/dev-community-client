import './style.css'

export default function Spinner({ dim }) {
    return <div className='outer' style={{ height: dim, width: dim }}></div>
}