import React from 'react';
import Register from '../components/Register/Register';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const RegisterPage = () => {

    const navigate = useNavigate();

    // Функция регистрации
    const handleSubmit = async (username, email, password, passwordConfirmed) => {
        try {
            await register(username, email, password, passwordConfirmed);
            navigate('/');
            toast.success('Registered successfully!');

        } catch (error) {
            toast.error(error.toString());
        }
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
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
            <Register
                handleSubmit={handleSubmit}
                goToLogin={goToLogin}
            />
        </div>
        
    );
}

export default RegisterPage;
