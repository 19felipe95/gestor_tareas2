import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:4000/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <TaskForm onNewTask={addTask} />
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button 
  onClick={() => deleteTask(task.id)} 
  style={{ marginLeft: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
>
  Eliminar
</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
