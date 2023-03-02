import React from 'react';

const Modal = ({ showModal, handleCloseModal }) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseModal}>Submit</button>
            <p>Modal content goes here</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;