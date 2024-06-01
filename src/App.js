import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css';
import Authentication from './Authentication';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <div className="app">
              <div className="app-header">
                <h1>Task Manager</h1>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
              <TaskForm addTask={addTask} updateTask={updateTask} editingTask={editingTask} />
              <div className="filters">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('pending')}>Pending</button>
              </div>
              <TaskList 
                tasks={filteredTasks} 
                setEditingTask={setEditingTask} 
                deleteTask={deleteTask} 
                toggleComplete={toggleComplete} 
              />
            </div>
          ) : (
            <Navigate to="/authentication" />
          )
        }
      />
      <Route path="/authentication" element={<Authentication />} />
     
    </Routes>
  );
};

export default App;
