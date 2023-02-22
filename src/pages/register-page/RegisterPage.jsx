import RegisterForm from './components/RegisterForm';
import './style.css'

export default function RegisterPage() {
    return (
        <div className="page-center">
            <div className="main-form-wrapper">
                <h1>Register</h1>
                <RegisterForm />
            </div>
        </div>
    )
}