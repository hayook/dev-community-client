import { Link } from 'react-router-dom'
import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="page-center">
            <div className="main-form-wrapper">
                <h1>Register</h1>
                <RegisterForm />
                <Link to='/'>Login</Link>
            </div>
        </div>
    )
}