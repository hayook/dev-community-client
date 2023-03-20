import { useState, useRef } from 'react'
import Show from '../show/Show'
import { stringMatch } from '../../../lib/string'
import './style.css'


export default function ChipInput({ options, placeholder, chips, onSelect, onRemove }) {

    const chipsInputRef = useRef(null);

    const [suggested, setSuggested] = useState([]);
    const [input, setInput] = useState('');

    const search = ({ target }) => {
        setInput(() => target.value);
        const s = options.filter(option => stringMatch(option.name, target.value));
        setSuggested(s);
    }

    const insertChip = chip => {
        onSelect(chip);
        setInput('');
        setSuggested([]);
        chipsInputRef.current.focus();
    }

    return (
        <div className="chips-input">
            <div className="inputs">

                <Show when={chips.length !== 0}>
                    {chips.map((chip, idx) => <div key={idx} className='chip'>
                        <span>{chip.name}</span>
                        <button onClick={() => onRemove(chip.id)} type="button">x</button>
                    </div>)}
                </Show>

                <input
                    ref={chipsInputRef}
                    placeholder={placeholder}
                    type="text"
                    onChange={search}
                    className="main-input"
                    value={input}
                />
            </div>

            <Show when={suggested.length !== 0}>
                <ul className="suggested-list">
                    {suggested.map((chip, idx) => <li key={idx} onClick={() => insertChip(chip)}>{chip.name}</li>)}
                </ul>
            </Show>

        </div>
    )
}