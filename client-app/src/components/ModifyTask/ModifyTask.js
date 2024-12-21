import React from 'react';
import '../../TaskForm.css';
import TaskForm from '../TaskForm/TaskForm';

const ModifyTask = ({title, desc, priority, status, deadline, onSubmit}) => {
    const handleSubmit = (newTask) => {
        onSubmit(newTask);
    };

    return (
        <TaskForm
            title={title}
            desc={desc}
            priority={priority}
            status={status}
            handleSubmit={handleSubmit}
            deadline={deadline}
        />
    );
}

export default ModifyTask;
