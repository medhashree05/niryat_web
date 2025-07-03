// PopupCard.js - Simple reusable popup component
import React from 'react';
import './PopupCard.css';

const PopupCard = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info', // 'success', 'error', 'warning', 'info'
  showConfirm = false, // Set to true for confirm dialogs
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className={`popup-header popup-header-${type}`}>
          <span className="popup-icon">{getIcon()}</span>
          {title && <h3 className="popup-title">{title}</h3>}
        </div>
        
        <div className="popup-body">
          <p className="popup-message">{message}</p>
        </div>
        
        <div className="popup-footer">
          {showConfirm ? (
            <>
              <button className="popup-btn popup-btn-secondary" onClick={onClose}>
                {cancelText}
              </button>
              <button className={`popup-btn popup-btn-${type}`} onClick={handleConfirm}>
                {confirmText}
              </button>
            </>
          ) : (
            <button className={`popup-btn popup-btn-${type}`} onClick={onClose}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupCard;

// Example usage in your ProductList component:
