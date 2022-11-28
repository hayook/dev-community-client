export default function LoginForm() {
    return (
        <form className="login-form">
            <label>Username Or Email</label>
            <input type="text" placeholder="Enter Username Or Email" />
            <label>Password</label>
            <input type="password" placeholder="Enter Password" />
            <button>Login</button>
        </form>
    )
}