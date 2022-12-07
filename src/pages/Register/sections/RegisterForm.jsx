import { useState } from 'react';

export default function RegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/register/', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ username, password })
        }).then(res => {res.json()})
        .then(data => console.log(data));
    }

    return (
        <form className="main-form">
            <label>First Name</label>
            <input className="main-input" value={username} type="text" onChange={({ target }) => setUsername(target.value)} placeholder="Enter Your First Name"/>
            <label>Last Name</label>
            <input className="main-input" type="text" placeholder="Enter Your Last Name"/>
            <label>Email</label>
            <input className="main-input" type="email" placeholder="Enter Your Email"/>
            <label>Password</label>
            <input className="main-input" value={password} type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Enter Password"/>
            <label>Confirm Password</label>
            <input className="main-input" type="password" placeholder="Confirm Password"/>
            <button onClick={register} className="main-button">Register</button>
        </form>
    )
}