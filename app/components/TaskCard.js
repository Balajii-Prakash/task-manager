// components/TaskCard.js
import { Button } from "@/components/ui/button";
export default function TaskCard({ task, onEdit, onDelete }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p className="mt-2">{task.description}</p>
        <p className="mt-2 text-gray-500">{task.status}</p>
        <div className="mt-4">
          <Button onClick={() => onEdit(task)} className="text-red-500">
            Edit
          </Button>
          <Button 
            onClick={() => onDelete(task.id)}
            className="ml-4 text-red-500">
            Delete
          </Button>
        </div>
      </div>
    );
  }
  

  