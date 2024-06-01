import React from 'react';
import TaskItem from './TaskItem';
import "./TaskList.css";

const TaskList = ({ tasks, setEditingTask, deleteTask, toggleComplete }) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          setEditingTask={setEditingTask} 
          deleteTask={deleteTask} 
          toggleComplete={toggleComplete} 
        />
      ))}
    </ul>
  );
};

export default TaskList;
