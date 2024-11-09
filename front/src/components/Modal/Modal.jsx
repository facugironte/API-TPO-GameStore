import React from "react";
import "./modal.css"

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) { 
        onClose()
      }
    };
    
    return (
      <div className="modal" onClick={handleOverlayClick}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    );
  };

export default Modal;