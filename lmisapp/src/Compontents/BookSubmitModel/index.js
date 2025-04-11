import React from 'react';

export default function BookSubmitItemModel({ closeModel, itemId, onChecked, studentName, isChecked }) {
  const handleSubmition = () => {
    onChecked(itemId, isChecked);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h3>{isChecked ? 'Cancel Book Submission?' : 'Confirm Book Submission'}</h3>
        <p>
          {isChecked 
            ? `You are about to *uncheck* the record, meaning the book was not returned by ${studentName}. Are you sure?` 
            : `By checking this record, you confirm that ${studentName} has returned the book. Proceed?`}
        </p>
        <div className="dialog-actions">
          <button onClick={handleSubmition} className="confirm-button">Yes, Confirm</button>
          <button onClick={closeModel} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}
