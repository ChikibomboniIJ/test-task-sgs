import React, { useState } from 'react';


const Register = ({handleSubmit, goToLogin}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');
    
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(username, email, password, passwordConfirmed);
    };

    return (
        <div className="form-container">
            <form onSubmit={onSubmit} className="form">
                <h2>Register</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
                <input
                    type="password"
                    value={passwordConfirmed}
                    onChange={(e) => setPasswordConfirmed(e.target.value)}
                    required
                    placeholder="Confirm password"
                />
                <button type="submit">Register</button>
                <div className="switch-form">
                    <p>Already have an account?</p>
                    <button type="button" className="switch-btn" onClick={goToLogin}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
