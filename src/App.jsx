import { Routes, Route, Navigate } from 'react-router-dom'; 
import Login from './pages/login/Login';
import Register from './pages/Register/Register';

export default function App() {

    const user = {id: 15432, username: 'adsf'}; 

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        
    )
}