import React from 'react';

const TaskItem = ({ task, setEditingTask, deleteTask, toggleComplete }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <span>{task.title}</span>
      <p>{task.description}</p>
      <button onClick={() => toggleComplete(task.id)}>
        {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
      </button>
      <button onClick={() => setEditingTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
