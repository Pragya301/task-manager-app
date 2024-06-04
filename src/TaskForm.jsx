import React, { useState, useEffect } from 'react';
import "./TaskForm.css";

const TaskForm = ({ addTask, updateTask, editingTask }) => {
  const [task, setTask] = useState({ title: '', description: '' });
  const [successMessage, setSuccessMessage] = useState(''); // State for message

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({ title: '', description: '' });
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(task);
      setSuccessMessage('Task updated successfully!');
    } else {
      addTask(task);
      setSuccessMessage('Task added successfully!');
    }
    setTask({ title: '', description: '' });
    const timeoutId = setTimeout(() => {
      setSuccessMessage('');
    }, 2000); 
    return () => clearTimeout(timeoutId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        required
      ></textarea>
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </form>
  );
};

export default TaskForm;
