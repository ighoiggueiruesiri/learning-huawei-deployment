import { useEffect, useState } from 'react';
import './App.css'; // Ensure this is imported if not already

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodo }),
      });
      const addedTodo = await res.json();
      setTodos([...todos, addedTodo]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      const updatedTodo = await res.json();
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List App</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, todo.completed)}
              className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;