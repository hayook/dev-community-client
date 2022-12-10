import { useState } from 'react';
import { useMutation } from 'react-query'
import Spinner from '../../../components/spinner/Spinner'
import { authUser } from '../../../app/api'
import { Link } from 'react-router-dom'; 

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
}

export default function RegisterForm() {

    const [userInfo, setUserInfo] = useState(initialState);
    const [registered, setRegistered] = useState({ show: false, success: false, message: 'Registration Success!' });
    const [regErr, setRegErr] = useState('');

    const { isLoading, mutate } = useMutation(authUser);

    const handleRegister = (e) => {
        e.preventDefault();
        if (userInfo.firstName === '') {
            setRegistered({ ...registered, show: true, message: 'First Name Shouldn\'t Be Empty'})
            return;
        }

        if (userInfo.lastName === '') {
            setRegistered({ ...registered, show: true, message: 'Last Name Shouldn\'t Be Empty'})
            return;
        }

        if (userInfo.username === '') {
            setRegistered({ ...registered, show: true, message: 'Username Shouldn\'t Be Empty'})
            return;
        }

        if (userInfo.email === '') {
            setRegistered({ ...registered, show: true, message: 'Email Shouldn\'t Be Empty'})
            return;
        }

        if (userInfo.password.length < 8) {
            setRegistered({ ...registered, show: true, message: 'Password Should be at least 8 characters long'})
            return;
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            setRegistered({ ...registered, show: true, message: 'Passwords Don\'t match' });
            return;
        }

        console.log('Passed')

        const user = {
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            username: userInfo.username,
            password: userInfo.password,
            email: userInfo.email,
            phone_number: 0,
        }
        mutate(({ endpoint: '/register', body: user, json: true}), {
            onSuccess: (res) => {
                if (res.status === 201) {
                    setRegErr(''); 
                    setRegistered(true);
                    setUserInfo(initialState);
                    return;
                }
                console.log(res)
                setRegErr(res.data.detail); 
                setRegistered(false)
            },
            onError: (err) => console.log('error ' + err)
        })

    }

    return (
        <form onSubmit={handleRegister} className="main-form">
            {
                registered.show &&
                <span className={ registered.success ? 'reg-success' : 'reg-error' }>
                    { registered.message } { (registered.success && <Link to='/'>Login</Link>) } 
                </span>
            }
            <label>First Name</label>
            <input
                onChange={({ target }) => setUserInfo({ ...userInfo, firstName: target.value })}
                className="main-input"
                value={userInfo.firstName}
                type="text"
                placeholder="Enter Your First Name"
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

            <button className="main-button" disabled={isLoading}>{isLoading ? <Spinner dim='20px' /> : 'Register'}</button>
        </form>
    )
}