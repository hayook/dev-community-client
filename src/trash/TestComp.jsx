import { useState } from 'react'
import RadioButton from '../pages/components/radio-button/RadioButton'

export default function TestComp() {

    const [role, setRole] = useState('');

    const submitFrom = e => {
        e.preventDefault();
        console.log(role);
    }

    return (
        <form onSubmit={submitFrom} >
            
            <button>Sumbit</button>
        </form>
    )
}