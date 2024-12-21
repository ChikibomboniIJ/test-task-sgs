import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import { changePassword } from '../services/auth';
import ChangePasswordForm from '../components/ChangePassword/ChangePassword';
import '../App.css'

const ChangePasswordPage = () => {
    const onSubmit = async (credentials) => {
        try {
            await changePassword(credentials.oldPassword, 
                credentials.newPassword,
                credentials.newPasswordConfirmed
            );
            toast.success('Password updated successfully!');
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className='wrapper'>
            <Navbar/>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <ChangePasswordForm
                onSubmit={onSubmit}
            />
        </div>

    );
}

export default ChangePasswordPage;
