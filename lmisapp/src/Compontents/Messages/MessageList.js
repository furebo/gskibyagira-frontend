import React, { useEffect, useState } from "react";
import styles from "./messagesList.module.css";
function MessagesList({ refresh }) {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //states to manage the comments
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [commenterNames, setCommenterNames] = useState({});

 //state to display or hide comment section
 const [commentVisible, setCommentVisible] = useState({});


  const messagesPerPage = 5;

  //function to fetch comments
  const fetchComments = async (messageId) => {
    const res = await fetch(`https://gskibyagira-backend.onrender.com/api/messages/${messageId}/comments`);
    const data = await res.json();
  
    // Check if response includes comments array or is the array directly
    const commentsArray = Array.isArray(data) ? data : data.comments;
  
    setComments(prev => ({ ...prev, [messageId]: commentsArray }));
  };
  
  useEffect(() => {
    
    const fetchMessages = async () => {
      try {
        const response = await fetch("https://gskibyagira-backend.onrender.com/api/messages/messages");
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
    //fetchComments();
  }, [refresh]);

  const handleLike = async (id) => {
    console.log(id)
    const res = await fetch(`https://gskibyagira-backend.onrender.com/api/messages/messages/${id}/like`, {
      method: 'PATCH'
    });
  console.log(res)
    if (res.ok) {
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, likes: (msg.likes || 0) + 1 } : msg));
    }
  };

  const handleDislike = async (id) => {
    const res = await fetch(`https://gskibyagira-backend.onrender.com/api/messages/messages/${id}/dislike`, {
      method: 'PUT'
    });
    if (res.ok) {
      setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, dislikes: (msg.dislikes || 0) + 1 } : msg));
    }
  };

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  //Function to handle the comment submission
  const handleCommentSubmit = async (messageId) => {
    const commentText = newComments[messageId];
    const commenterName = commenterNames[messageId];
    if (!commentText || !commenterName) return;
  
    const res = await fetch(`https://gskibyagira-backend.onrender.com/api/messages/${messageId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentText, commenterName }),
    });
  
    if (res.ok) {
      setNewComments(prev => ({ ...prev, [messageId]: '' }));
      console.log(newComments);
      fetchComments(messageId); // Re-fetch comments
    }
  };
//&#128172;
  const handleMsgReply = (messageId) => {
    setCommentVisible(prev => ({
      ...prev,
      [messageId]: !prev[messageId]  // Toggle the visibility
    }));
    fetchComments(messageId); // Load comments when opened
  };
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
                <div className="message-display">
                <div className="img-message">
                <div className={styles.avatar}>
                  {msg.firstName.charAt(0)}{msg.lastName.charAt(0)}
                </div>
                <div className={styles.messageContent}>
                  <strong>{msg.firstName} {msg.lastName}:</strong> {msg.message}
                  <span className={styles.timestamp}>{new Date(msg.createdAt).toLocaleString()}</span>
                  <div className={styles.reactions}>
                    <button onClick={() => handleLike(msg.id)}>👍 {msg.likes ?? 0 }</button> 
                    <button onClick={() => handleDislike(msg.id)}>👎 {msg.dislikes ?? 0}</button>
                    <button onClick={() => handleMsgReply(msg.id)} className={styles.commentToggleBtn}>
                           {commentVisible[msg.id] ? '▲' : '▼'} Respond
                    </button>
                  </div>
                </div>
                </div>
  {commentVisible[msg.id] && (
  <div className={styles.commentsSection}>
  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
  {(comments[msg.id] || []).map((c, i) => (
    <li key={i} className={styles.commentItem}>
      <div className={styles.commentAvatar}>
        {c.commenterName?.charAt(0).toUpperCase()}
      </div>
      <div className={styles.commentBubble}>
        <strong>{c.commenterName}</strong>: {c.commentText}
      </div>
    </li>
  ))}
</ul>

    <div className={styles.CommentResponse}>
    <input autoFocus type="text" style={{width:"100%",marginBottom:"5px", cursor:""}}
    placeholder=" Write Your name"
    value={commenterNames[msg.id] || ''}
    onChange={(e) =>
      setCommenterNames({ ...commenterNames, [msg.id]: e.target.value })
    } />
    <input
      style={{width:"100%",marginBottom:"5px"}}
      type="text"
      placeholder="Write a comment..."
      value={newComments[msg.id] || ''}
      onChange={(e) =>
        setNewComments({ ...newComments, [msg.id]: e.target.value })
      }
    />
    <button className={styles.commentResponseBtn} onClick={() => handleCommentSubmit(msg.id)}>Respond</button>
    </div>
    
  </div>
)}
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
