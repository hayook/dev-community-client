import { useState } from 'react';
import { useMutation } from 'react-query'
import { authUser, requestContents } from '../../../app/api'
import { useNavigate } from 'react-router-dom';
import MainButton from '../../components/main-button/MainButton';
import Show from '../../components/show/Show'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
}

export default function RegisterForm() {

    const navigate = useNavigate();

    const [regErr, setRegErr] = useState('');
    const [userInfo, setUserInfo] = useState(initialState);

    // Send the register Request
    const { isLoading, mutate } = useMutation(authUser);
    const handleRegister = e => {
        e.preventDefault();

        if (userInfo.firstName === '') {
            setRegErr(`First Name can't be empty`);
            return;
        }

        if (userInfo.lastName === '') {
            setRegErr(`Last Name can't be empty`);
            return;
        }

        if (userInfo.username === '') {
            setRegErr(`Username Name can't be empty`);
            return;
        }

        if (userInfo.email === '') {
            setRegErr(`Email Name can't be empty`);
            return;
        }

        if (userInfo.password.length < 8) {
            setRegErr(`Password should be at least 8 characters long`);
            return;
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            setRegErr(`Passwords don't match`);
            return;
        }

        const user = {
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
            phone_number: 0,
        }

        mutate(({ endpoint: '/register', body: user, json: true, content: requestContents.json }), {
            onSuccess: res => {

                // User Successfully registered
                if (res.status === 201) {
                    setRegErr('');
                    setUserInfo(initialState);
                    navigate('/');
                    return;
                }

                // Invalid Inputs Errors
                setRegErr(res.data.detail);
            },
            onError: (err) => setRegErr('Something went wrong. Please try again')
        })

    }

    return (
        <form onSubmit={handleRegister} className="main-form">
            <Show when={!!regErr}>
                <span className='form-message error'>{regErr}</span>
            </Show>

            <label>First Name</label>
            <input
                onChange={({ target }) => setUserInfo({ ...userInfo, firstName: target.value })}
                className="main-input"
                value={userInfo.firstName}
                type="text"
                placeholder="Enter Your First Name"
                autoFocus
            />

            <label>Last Name</label>
            <input
                onChange={({ target }) => setUserInfo({ ...userInfo, lastName: target.value })}
                className="main-input"
                value={userInfo.lastName}
                type="text"
                placeholder="Enter Your Last Name"
            />

            <label>username</label>
            <input
                onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })}
                className="main-input"
                value={userInfo.username}
                type="text"
                placeholder="Enter Your username"
            />

            <label>Email</label>
            <input
                onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                className="main-input"
                value={userInfo.email}
                type="email"
                placeholder="Enter Your Email"
            />

            <label>Password</label>
            <input
                onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                className="main-input"
                value={userInfo.password}
                type="password"
                placeholder="Enter Password"
            />

            <label>Confirm Password</label>
            <input
                onChange={({ target }) => setUserInfo({ ...userInfo, confirmPassword: target.value })}
                className="main-input"
                value={userInfo.confirmPassword}
                type="password"
                placeholder="Confirm Password"
            />

            <MainButton disabled={isLoading}>Register</MainButton>
        </form>
    )
}