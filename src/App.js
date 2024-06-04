
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc, query, where } from 'firebase/firestore';
import './App.css';
import Authentication from './Authentication';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const q = query(collection(db, 'tasks'), where('uid', '==', user.uid));
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const userTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTasks(userTasks);
        });
        setSuccessMessage('Successfully Logged In');
        const timeoutId = setTimeout(() => {
          setSuccessMessage('');
        }, 20000); 
        return () => {
          clearTimeout(timeoutId);
          unsubscribeSnapshot();
        }
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (task) => {
    if (user) {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        uid: user.uid,
        completed: false,
        createdAt: Date.now(),
      });
    }
  };

  const updateTask = async (updatedTask) => {
    const taskDoc = doc(db, 'tasks', updatedTask.id);
    await updateDoc(taskDoc, updatedTask);
    setEditingTask(null);
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
  };

  const toggleComplete = async (id) => {
    const task = tasks.find(task => task.id === id);
    const taskDoc = doc(db, 'tasks', id);
    await updateDoc(taskDoc, { completed: !task.completed });
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
              {successMessage && <div className="success-message">{successMessage}</div>}
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


