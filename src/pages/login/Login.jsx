import { Link } from 'react-router-dom';
import LoginForm from './login-form/LoginForm'; 
import './style.css'; 

export default function Login() {
    return (
        <div className="login">
            <h1>Login</h1>
            <LoginForm />
            <Link to='/'>Create An Account</Link>
        </div>
    )
}