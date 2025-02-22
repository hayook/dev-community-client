import { Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import './style.css';

export default function LoginPage() {

    return (
        <div className="page-center">
            <div className="main-form-wrapper">
                <h1>Login</h1>
                <LoginForm />
                <Link to='/register'>Create An Account</Link>
            </div>
        </div>
    )
}