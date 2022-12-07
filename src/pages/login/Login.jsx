import { Link } from 'react-router-dom';
import LoginForm from './sections/login-form/LoginForm'; 
import './style.css'; 

export default function Login() {

    console.log("Login rendered");

    return (
        <div className="main-form-wrapper login-form-wrapper">
            <h1>Login</h1>
            <LoginForm />
            <Link to='/register'>Create An Account</Link>
        </div>
    )
}