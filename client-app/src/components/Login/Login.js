import React, { useState } from 'react';
import './Login.css'

const Login = ({handleSubmit, goToRegister}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(username, password);
    };

    return (
        <div className="form-container">
            <form onSubmit={onSubmit} className="form">
                <h2>Login</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
                <div className="switch-form">
                    <p>Don't have an account?</p>
                    <button type="button" className="switch-btn" onClick={goToRegister}>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
