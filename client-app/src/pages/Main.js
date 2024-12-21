import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Mainlist from '../components/MainList/MainList';
import '../App.css'

const MainPage = () => {
    const navigate = useNavigate();

    const links = [
        { path: '/tasks', label: 'Task List', description: 'View and manage tasks' },
        { path: '/tasks/create', label: 'Add Task', description: 'Create a new task' },
        { path: '/change-password', label: 'Change Password', description: 'Change user password'}
    ];

    const goToPage = (path) => {
        navigate(path);
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <Mainlist
            goToPage={goToPage}
            links={links}
            />
        </div>
    );
};

export default MainPage;
