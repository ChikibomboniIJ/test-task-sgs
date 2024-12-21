import React, { useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

const TaskList = ({ handleDelete, onModify, onStatusChange, onPriorityChange, tasksByStatus }) => {
    const [activeTab, setActiveTab] = useState('new');

    const tabs = [
        { label: 'New', value: 'new', count: tasksByStatus.new.length },
        { label: 'Pending', value: 'pending', count: tasksByStatus.pending.length },
        { label: 'Completed', value: 'completed', count: tasksByStatus.completed.length },
    ];

    // Функция для сортировки задач по приоритету
    const sortByPriority = (tasks) => {
        const priorityOrder = {
            High: 3,
            Medium: 2,
            Low: 1,
        };

        return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    };

    return (
        <div className="task-list-container">
            <div className="tab-cards">
                {tabs.map((tab) => (
                    <div
                        key={tab.value}
                        className={`tab-card ${activeTab === tab.value ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.value)}
                    >
                        <h4>{tab.label}</h4>
                        <p>{tab.count} tasks</p>
                    </div>
                ))}
            </div>

            {/* Контент вкладок */}
            <div className="tab-content">
                {activeTab === 'new' && (
                    <div className="tab-content-block">
                        {tasksByStatus.new.length > 0 ? (
                            sortByPriority(tasksByStatus.new).map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onStatusChange={onStatusChange}
                                    onPriorityChange={onPriorityChange}
                                    onDelete={handleDelete}
                                    onModify={onModify}
                                />
                            ))
                        ) : (
                            <p>No tasks</p>
                        )}
                    </div>
                )}
                {activeTab === 'pending' && (
                    <div className="tab-content-block">
                        {tasksByStatus.pending.length > 0 ? (
                            sortByPriority(tasksByStatus.pending).map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onStatusChange={onStatusChange}
                                    onPriorityChange={onPriorityChange}
                                    onDelete={handleDelete}
                                    onModify={onModify}
                                />
                            ))
                        ) : (
                            <p>No tasks</p>
                        )}
                    </div>
                )}
                {activeTab === 'completed' && (
                    <div className="tab-content-block">
                        {tasksByStatus.completed.length > 0 ? (
                            sortByPriority(tasksByStatus.completed).map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onStatusChange={onStatusChange}
                                    onPriorityChange={onPriorityChange}
                                    onDelete={handleDelete}
                                    onModify={onModify}
                                />
                            ))
                        ) : (
                            <p>No tasks</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;
