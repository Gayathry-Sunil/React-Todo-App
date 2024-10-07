import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = ({ setShowConfirmation, setItemToDelete, onToggleComplete }) => {
  const todos = useSelector((state) => state.todos);

  const handleDeleteClick = (todo) => {
    setItemToDelete(todo);
    setShowConfirmation(true);
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Complete</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onDelete={() => handleDeleteClick(todo)} 
              onToggleComplete={onToggleComplete} 
            />
          ))}
        </tbody>
      </table>
      {todos.length === 0 && <p>No tasks available.</p>}
    </div>
  );
};

export default TodoList;
