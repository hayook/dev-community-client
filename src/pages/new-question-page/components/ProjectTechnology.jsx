import { RxCross1 } from 'react-icons/rx'

export default function ProjectTechnology({ name, id, removeFromTags }) {
    return (
        <div className="technology">
            <span>{name}</span>
            <button onClick={() => removeFromTags(id)} className='times-button'><span><RxCross1 /></span></button>
        </div>
    )
}