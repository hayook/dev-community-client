import { useRef } from 'react';
import './style.css'

export default function RadioButton({ label, value, setValue, checked }) {

    const radioRef = useRef(null);

    return (
        <div onClick={() => radioRef.current.click()} className="radio">
            <input ref={radioRef} type="radio" value={value} onChange={({ target }) => setValue(target.value)} checked={checked} />
            <div className="check"></div>
            <label htmlFor="f-option">{label}</label>
        </div>
    )
}