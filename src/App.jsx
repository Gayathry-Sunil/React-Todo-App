import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ConfirmationModal from './components/ConfirmationModal';
import { deleteTodo, deleteAllTodos, toggleComplete } from './features/todosSlice';
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      dispatch(deleteTodo(itemToDelete.id));
    }
    setItemToDelete(null);
    setShowConfirmation(false);
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTodos());
    setShowConfirmation(false);
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <Provider store={store}>
      <div className="app">
        <h1>Todo List</h1>
        <TodoForm setShowModal={setShowModal} />
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p className="success-message">Item added successfully! 🎉</p>
              <button onClick={() => setShowModal(false)}>OK</button>
            </div>
          </div>
        )}
        <TodoList
          setShowConfirmation={setShowConfirmation}
          setItemToDelete={setItemToDelete}
          onToggleComplete={handleToggleComplete}
        />
        
        {/* Flex container for total items and delete all button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div className="total-items">
            Total Items: {todos.length}
          </div>
          <button className="delete-button" onClick={() => { setItemToDelete(null); setShowConfirmation(true); }}>
            Delete All
          </button>
        </div>
        
        {showConfirmation && (
          <ConfirmationModal
            isOpen={showConfirmation}
            onConfirm={itemToDelete ? handleDeleteConfirm : handleDeleteAll}
            onCancel={() => setShowConfirmation(false)}
            item={itemToDelete || { text: ' Do you want to delete all items ?' }}
          />
        )}
      </div>
    </Provider>
  );
};

export default App;
