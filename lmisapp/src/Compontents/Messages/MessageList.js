import React, { useEffect, useState } from "react";
import styles from "./messagesList.module.css";

function MessagesList({ refresh }) {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages/messages");
        const result = await response.json();
        if (response.ok) {
          setMessages(result.data.reverse());
        } else {
          console.error("Failed to fetch messages:", result.error);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [refresh]);

  const handleLike = async (id) => {
    const res = await fetch(`http://localhost:5000/api/messages/messages/${id}/like`, {
      method: 'PUT'
    });
    if (res.ok) {
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, likes: (msg.likes || 0) + 1 } : msg));
    }
  };

  const handleDislike = async (id) => {
    const res = await fetch(`http://localhost:5000/api/messages/messages/${id}/dislike`, {
      method: 'PUT'
    });
    if (res.ok) {
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, dislikes: (msg.dislikes || 0) + 1 } : msg));
    }
  };

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  return (
    <div className={styles.messagesContainer}>
      <h2>What People Say</h2>
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
                  <div className={styles.reactions}>
                    <button onClick={() => handleLike(msg.id)}>👍 {msg.likes || 0}</button>
                    <button onClick={() => handleDislike(msg.id)}>👎 {msg.dislikes || 0}</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
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
