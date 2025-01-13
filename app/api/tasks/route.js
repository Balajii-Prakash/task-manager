
import mysql from 'mysql2';

// Set up the MySQL connection directly in the route
const pool = mysql.createPool({
  host: 'localhost',   
  user: 'root',         
  password: 'root', 
  database: 'task_manager', 
});

const promisePool = pool.promise();

// GET - Retrieve all tasks
export async function GET() {
  try {
    const [tasks] = await promisePool.query('SELECT * FROM tasks');
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch tasks', { status: 500 });
  }
}

// POST - Create a new task
export async function POST(req) {
  const { title, description, status } = await req.json();

  try {
    const [result] = await promisePool.query(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description, status]
    );
    return new Response(
      JSON.stringify({ id: result.insertId, title, description, status }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response('Failed to add task', { status: 500 });
  }
}

// PUT - Update a task
export async function PUT(req) {
  const { id, title, description, status } = await req.json();

  try {
    await promisePool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, id]
    );
    return new Response(JSON.stringify({ id, title, description, status }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update task', { status: 500 });
  }
}

// DELETE - Delete a task
export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await promisePool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return new Response('Task deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete task', { status: 500 });
  }
}

