import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ title: initialTitle, desc: initialDesc, priority: initialPriority, status: initialStatus, deadline: initialDeadline, handleSubmit }) => {
    const [title, setTitle] = useState(initialTitle);
    const [desc, setDesc] = useState(initialDesc);
    const [priority, setPriority] = useState(initialPriority);
    const [status, setStatus] = useState(initialStatus);
    const [deadline, setDeadline] = useState(initialDeadline);

    const onSubmit = (e) => {
        e.preventDefault();
        const taskData = { title, desc, priority, status, deadline };
        handleSubmit(taskData);
    };

    return (
        <div className="form-container">
            <form onSubmit={onSubmit} className="task-form">
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </label>
                
                <label>
                    Priority:
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
                <label>
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="New">New</option>
                        <option value="Pending">In progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                
                <label>
                    Deadline:
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
