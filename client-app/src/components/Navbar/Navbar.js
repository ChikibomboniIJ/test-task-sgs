import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout as logoutService } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const { logout: logoutUser } = useAuth();

    const links = [
        { path: '/', label: 'Home' },
        { path: '/tasks', label: 'Tasks' },
        { path: '/tasks/create', label: 'Create Task' },
        { path: '/change-password', label: 'Change Password' },
    ];

    const handleLogout = async () => {
        try {
            await logoutService();
            logoutUser();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <nav className='navbar'>
            <ul className='navList'>
                {links.map((link) => (
                    <li
                        key={link.path}
                        className={`navItem ${location.pathname === link.path ? 'activeNavItem' : ''}`}
                    >
                        <Link to={link.path} className='navLink'>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout} className='logoutButton'>Logout</button>
        </nav>
    );
};

export default Navbar;
