import React, { useState } from 'react';
import './index.css';

export default function DeleteItemModel({closeModel, itemId, onDelete, studentName }) {
  const handleDelete = () => {
    // Call the onDelete function passed as a prop
    onDelete(itemId);

  };
  
  return (
    <div>
              <div className="dialog-overlay">
              <div className="dialog-box">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete {studentName} ?</p>
                <div className="dialog-actions">
                  <button onClick={handleDelete} className="confirm-button">
                    Yes, Delete
                  </button>
                  <button onClick={closeModel} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
    </div>
  );
}
