import React, { useEffect, useState } from "react";
import styles from "./messagesList.module.css";

function MessagesList({ refresh }) {
  const [messages, setMessages] = useState([]); // Store messages
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5; // Number of messages per page

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      //
      try {
        const response = await fetch("https://gskibyagira-backend.onrender.com/api/messages/messages");
        const result = await response.json();

        if (response.ok) {
          setMessages(result.data.reverse()); // Reverse to show newest messages first
        } else {
          console.error("Failed to fetch messages:", result.error);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [refresh]); // Re-fetch when 'refresh' prop changes

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  return (
    <div className={styles.messagesContainer}>
      <h2>What  People Say</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <>
          <ul className={styles.messagesList}>
            {currentMessages.map((msg, index) => (
              <li key={index} className={styles.messageItem}>
                <div className={styles.avatar}>
                  {msg.firstName.charAt(0)}{msg.lastName.charAt(0)}
                </div>
                <div className={styles.messageContent}>
                  <strong>{msg.firstName} {msg.lastName}:</strong> {msg.message}
                  <span className={styles.timestamp}>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {Math.ceil(messages.length / messagesPerPage)}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastMessage >= messages.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MessagesList;
