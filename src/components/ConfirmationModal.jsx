import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, item }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p className="success-message">{item.text}</p>
        <button onClick={onCancel} style={{ marginRight: '10px' }}>Cancel</button>
        <button onClick={onConfirm} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
