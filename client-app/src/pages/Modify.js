import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ModifyTask from '../components/ModifyTask/ModifyTask';
import { fetchTaskById, updateTask } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'

const ModifyPage = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTask = async () => {
            try {
                const taskData = await fetchTaskById(id);
                setTask(taskData);
                setError(null);
            } catch (err) {
                setError('Unable to load the task. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadTask();
    }, [id]);

    const onSubmit = async (updatedTask) => {
        try {
            await updateTask(id, updatedTask);
            toast.success('Task updated successfully!');
            setTask(prevTask => ({
                ...prevTask,
                ...updatedTask,
            }));
        } catch (error) {
            toast.error(error.toString());
        }
    };

    if (loading) return <p>Loading task...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="wrapper">
            <Navbar />
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
            {task && (
                <ModifyTask
                    title={task.title}
                    desc={task.desc}
                    priority={task.priority}
                    status={task.status}
                    deadline={task.deadline}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default ModifyPage;
