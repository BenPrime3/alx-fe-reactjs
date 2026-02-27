import React, { useState } from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => (
  <li>
    <span
      onClick={() => toggleTodo(todo.id)}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
      data-testid={`todo-${todo.id}`}
    >
      {todo.text}
    </span>
    <button onClick={() => deleteTodo(todo.id)} data-testid={`delete-${todo.id}`}>
      Delete
    </button>
  </li>
);

const AddTodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add todo..."
        data-testid="add-input"
      />
      <button type="submit">Add</button>
    </form>
  );
};

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write Tests', completed: false },
  ]);

  const addTodo = text => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm addTodo={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;