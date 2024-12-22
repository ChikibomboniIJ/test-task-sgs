import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList/TaskList';
import Navbar from '../components/Navbar/Navbar';
import { fetchTasks, updateTask, deleteTask } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getTasks() {
            try {
                const fetchedTasks = await fetchTasks();
                if (fetchedTasks) {
                    setTasks(fetchedTasks);
                } else {
                    console.error('Failed to fetch tasks.');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        getTasks();
    }, []);

    const onStatusChange = (task, direction) => {
        const statusOrder = ['New', 'Pending', 'Completed'];
        const currentIndex = statusOrder.indexOf(task.status);
        let newIndex = currentIndex;

        if (direction === 'right' && currentIndex < statusOrder.length - 1) {
            newIndex++;
        } else if (direction === 'left' && currentIndex > 0) {
            newIndex--;
        } else {
            return;
        }

        const newStatus = statusOrder[newIndex];
        handleStatusChange(task.id, newStatus);
    };

    // Функция смены статуса задачи
    const handleStatusChange = async (taskId, status) => {
        try {
            await updateTask(taskId, { status });
            setTasks(tasks.map(task => task.id === taskId ? { ...task, status: status } : task));
        } catch (error) {
            console.error(`Error updating task with id ${taskId}:`, error);
        }
    };

    // Функция смены приоритета задачи
    const handlePriorityChange = async (taskId, priority) => {
        try {
            await updateTask(taskId, {priority: priority})
            setTasks(tasks.map(task => task.id === taskId ? { ...task, priority: priority } : task));
        } catch (error) {
            console.log(`Error updating task with id ${taskId}:`, error)
        }
    }

    //Функция удаления задачи
    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error(`Error deleting task with id ${taskId}:`, error);
        }
    };

    const onPriorityChange = (task, direction) => {
        const priorities = ['Low', 'Medium', 'High'];
        const currentIndex = priorities.indexOf(task.priority);
        let newIndex = currentIndex;
        if (direction === 'up' && currentIndex < priorities.length - 1) {
            newIndex++;
        } else if (direction === 'down' && currentIndex > 0) {
            newIndex--;
        } else {
            return;
        }

        const newPriority = priorities[newIndex];
        handlePriorityChange(task.id, newPriority);
    };
    const onModify = (taskId) => {
        navigate(`/tasks/modify/${taskId}`);
    };

    const tasksByStatus = {
        new: tasks.filter(task => task.status === 'New'),
        pending: tasks.filter(task => task.status === 'Pending'),
        completed: tasks.filter(task => task.status === 'Completed')
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <TaskList
                handleDelete={handleDelete}
                onStatusChange={onStatusChange}
                onPriorityChange={onPriorityChange}
                onModify={onModify}
                tasksByStatus={tasksByStatus}
            />
        </div>
    );
};

export default TasksPage;
