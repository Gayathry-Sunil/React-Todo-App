import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  // Inline style for completed tasks
  const completedStyle = {
    backgroundColor: '#4caf50', // Green background
    color: '#fff', // White text
  };

  return (
    <tr style={todo.completed ? completedStyle : {}}>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
        />
      </td>
      <td style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </td>
      <td>
        <button className="delete-button" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default TodoItem;
