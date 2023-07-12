import React, { useState, useEffect } from 'react';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../utils/supabaseService';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const todos = await getTodos();
    setTodos(todos);
  }

  async function handleCreate() {
    await createTodo(task);
    fetchTodos();
    setTask('');
  }

  async function handleUpdate(id, is_complete) {
    await updateTodo(id, !is_complete);
    fetchTodos();
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    fetchTodos();
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className='p-6 max-w-sm bg-white rounded-xl shadow-md flex flex-col space-y-4'>
        <input
          className='border-2 rounded-md'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='New Task'
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleCreate}
        >
          Create
        </button>

        {todos.map((todo) => (
          <div key={todo.id} className='flex items-center space-x-4'>
            <input
              type='checkbox'
              checked={todo.is_complete}
              onChange={() => handleUpdate(todo.id, todo.is_complete)}
            />
            <span>{todo.task}</span>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
