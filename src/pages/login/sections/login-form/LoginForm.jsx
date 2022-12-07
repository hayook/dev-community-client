import { useState } from 'react'

export default function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        const data = new URLSearchParams({ username, password }); 
        fetch('http://localhost:3000/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
            }, 
            body: data,
        })
        .then(res => res.json())
        .then(data => {
            const { access_token:token } = data; 
            localStorage.setItem('token', token);
        });
    }

    return (
        <form className="main-form login-form">
            <label>Username Or Email</label>
            <input onChange={({ target }) => setUsername(target.value)} value={username} className="main-input" type="text" placeholder="Enter Username Or Email" />
            <label>Password</label>
            <input onChange={({ target }) => setPassword(target.value)} value={password} className="main-input" type="password" placeholder="Enter Password" />
            <button onClick={login} className="main-button">Login</button>
        </form>
    )
}