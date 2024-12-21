import React, { useState } from 'react';
import './ChangePassword.css';

const ChangePasswordForm = ({ onSubmit }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('New password and confirmation do not match!');
            return;
        }

        onSubmit({ oldPassword: currentPassword, newPassword, newPasswordConfirmed: confirmPassword});
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="task-form">
                <label>
                    Current Password:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm New Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
