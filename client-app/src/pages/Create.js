import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import CreateTask from '../components/CreateTask/CreateTask';
import { createTask } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';

const CreatePage = () => {
    const onSubmit = async (task) => {
        try {
            await createTask(task);
            toast.success('Task created successfully!');
        } catch (error) {
            toast.error(error.toString());
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
            <CreateTask
                onSubmit={onSubmit}
            />
        </div>

    );
}

export default CreatePage;
