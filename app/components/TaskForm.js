
'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue

    
  } from "@/components/ui/select"
  


export default function TaskForm({ onAdd, onUpdate, taskToEdit }) {
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [status, setStatus] = useState(taskToEdit?.status || 'pending');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { title, description, status };

    if (taskToEdit) {
      await onUpdate({ ...newTask, id: taskToEdit.id });
    } else {
      await onAdd(newTask);
    }

    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <Select onValueChange={(value) => setStatus(value)}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Pending</SelectItem>
    <SelectItem value="dark">In-Progress</SelectItem>
    <SelectItem value="system">Completed</SelectItem>
  </SelectContent>
</Select>

      

      

      
      <Button variant="" className=" w-full text-white p-2 rounded">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </Button>
    </form>
  );
}



