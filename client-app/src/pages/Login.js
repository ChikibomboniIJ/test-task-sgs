import React from 'react';
import Login from '../components/Login/Login';
import { login as loginService } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login: loginUser } = useAuth();

    const goToRegister = () => {
        navigate('/register');
    };
    // Функция логина
    const handleSubmit = async (username, password) => {
        try {
            await loginService(username, password);
            loginUser();
            navigate('/')
        } catch (error) {
            toast.error(error.toString());
        }
    };

    return (
        <div className='wrapper'>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Login
                handleSubmit={handleSubmit}
                goToRegister={goToRegister}
            />
        </div>
        
    );
}

export default LoginPage;
