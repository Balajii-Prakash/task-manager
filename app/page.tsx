
'use client'
import { useState, useEffect } from 'react';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';




type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};


export default function Home() {
  
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (newTask: any) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const addedTask = await res.json();
    setTasks([...tasks, addedTask]);
  };

  const handleUpdateTask = async (updatedTask: any) => {
    const res = await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const updated = await res.json();
    setTasks(tasks.map((task) => (task.id === updated.id ? updated : task)));
    setTaskToEdit(null);
  };

  const handleDeleteTask = async (id: number) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center">Task Manager</h1>
      <TaskForm onAdd={handleAddTask} onUpdate={handleUpdateTask} taskToEdit={taskToEdit} />

      <div className="mt-6 grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={setTaskToEdit}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}




