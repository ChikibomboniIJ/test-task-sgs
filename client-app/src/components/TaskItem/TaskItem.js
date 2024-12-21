import React from 'react';
import { FaTrashAlt, FaEdit, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './TaskItem.css';

const TaskItem = ({ task, onStatusChange, onDelete, onModify, onPriorityChange }) => {
    const priorityColors = {
        Low: '#4caf50',
        Medium: '#ff9800',
        High: '#f44336',
    };
    const statusColors = {
        New: '#2196f3',
        Pending: '#ff9800',
        Completed: '#4caf50',
    };

    const statusStyle = {
        backgroundColor: statusColors[task.status],
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '4px',
        fontWeight: 'bold',
    };

    const priorityStyle = {
        backgroundColor: priorityColors[task.priority],
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '4px',
        fontWeight: 'bold',
    };

    const formatDeadline = (deadline) => {
        if (!deadline) return 'No deadline';
        const date = new Date(deadline);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const deadlineStyle = (deadline) => {
        if (!deadline) return {};
        const today = new Date();
        const deadlineDate = new Date(deadline);
        if (deadlineDate < today) {
            return { color: '#f44336', fontWeight: 'bold' };
        } else if ((deadlineDate - today) / (1000 * 60 * 60 * 24) <= 3) {
            return { color: '#ff9800', fontWeight: 'bold' };
        }
        return { color: '#4caf50', fontWeight: 'bold' };
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the task "${task.title}"?`
        );
        if (confirmDelete) {
            onDelete(task.id);
        }
    };

    return (
        <div className="task-item">
            <div className="task-actions">
                <button
                    onClick={handleDelete}
                    className="icon-button delete-button"
                    title="Delete Task"
                >
                    <FaTrashAlt />
                </button>
                <button
                    onClick={() => onModify(task.id)}
                    className="icon-button edit-button"
                    title="Modify Task"
                >
                    <FaEdit />
                </button>
            </div>
            <h3>{task.title}</h3>
            <p>{task.desc}</p>
            <div className="task-status-actions">
                <span>
                    Priority: <span style={priorityStyle}>{task.priority}</span>
                </span>
                <button
                    title="Increase Priority"
                    disabled={task.status === 'High'}
                    onClick={() => onPriorityChange(task, 'up')}
                >
                    ↑
                </button>
                <button
                    title="Decrease Priority"
                    disabled={task.status === 'Low'}
                    onClick={() => onPriorityChange(task, 'down')}
                >
                    ↓
                </button>
            </div>
            <div className="task-status-actions">
                <span>
                    Status: <span style={statusStyle}>{task.status}</span>
                </span>
                <button
                    onClick={() => onStatusChange(task, 'left')}
                    disabled={task.status === 'New'}
                    title="Decrease Status"
                >
                    ←
                </button>
                <button
                    onClick={() => onStatusChange(task, 'right')}
                    disabled={task.status === 'Completed'}
                    title="Increase Status"
                >
                    →
                </button>
            </div>
            <p>
                Deadline: <span style={deadlineStyle(task.deadline)}>{formatDeadline(task.deadline)}</span>
            </p>
        </div>
    );
};

export default TaskItem;
