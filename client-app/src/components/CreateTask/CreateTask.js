import React from 'react';

import TaskForm from '../TaskForm/TaskForm';

const CreateTask = ({onSubmit}) => {
    const handleSubmit = (newTask) => {
        onSubmit(newTask);
    };

    return (
        <TaskForm
            title = ''
            desc = ''
            priority = 'Low'
            status = 'New'
            handleSubmit={handleSubmit}
            deadline={new Date()}
        />
    );
}

export default CreateTask;
