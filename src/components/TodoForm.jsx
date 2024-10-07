import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo } from '../features/todosSlice';
import ConfirmationModal from './ConfirmationModal';

const TodoForm = ({ setShowModal }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateTodo, setDuplicateTodo] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingTodo = todos.find(todo => todo.text.toLowerCase() === inputValue.toLowerCase());

    if (existingTodo) {
      setDuplicateTodo(existingTodo);
      setShowDuplicateModal(true);
      return;
    }

    if (inputValue.trim()) {
      dispatch(addTodo({ text: inputValue, completed: false }));
      setInputValue('');
      setShowModal(true);
    }
  };

  const handleDeleteExisting = () => {
    if (duplicateTodo) {
      dispatch(deleteTodo(duplicateTodo.id)); // Delete the existing todo
      dispatch(addTodo({ text: inputValue, completed: false })); // Add the new one
      setInputValue('');
      setShowDuplicateModal(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new todo..." 
        />
        <button type="submit">Add</button>
      </form>

      {showDuplicateModal && (
        <ConfirmationModal
          isOpen={showDuplicateModal}
          onConfirm={handleDeleteExisting} // Confirm to delete and add new
          onCancel={() => setShowDuplicateModal(false)} // Close modal on cancel
          item={{ text: `The item "${duplicateTodo.text}" already exists. Do you want to delete it and replace it ?` }} // Provide the message
        />
      )}
    </>
  );
};

export default TodoForm;
