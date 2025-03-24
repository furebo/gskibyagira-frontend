import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import sendCircle from "@iconify/icons-mdi/send-circle";
import styles from "./form.module.css";


function Form({ setRefresh }) {
  const [inputText, setInputText] = useState({
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Track form submission

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Disable button while processing
    //https://gskibyagira-backend.onrender.com
    try {
      const response = await fetch("https://gskibyagira-backend.onrender.com/api/messages/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputText),
      });
      console.log(response);
      const result = await response.json();

      if (response.ok) {
        //notify("Message sent successfully!");
        toast.success("Message sent successfully!", {
          style: { backgroundColor: "green", color: "white" },
        });
        setTimeout(() => {
          setInputText({ firstName: "", lastName: "", telephone: "", email: "", message: "" });
          setRefresh((prev) => !prev);
        }, 500); // Delay reset slightly to allow toast to show
      } else {
        console.log(`Failed to send message: ${result}`);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsSubmitting(false); // ✅ Re-enable button after request completes
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputText((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
    
      <form className={styles.form}>
        <h2 className={styles.formh2}>Send us a message</h2>
        <div className={styles.formContainer}>
          <div className={styles.formContainerDiv}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={inputText.firstName}
              onChange={handleChange}
              className={styles.firstname}
            />
          </div>
          <div className={styles.formContainerDiv}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={inputText.lastName}
              onChange={handleChange}
              className={styles.firstname}
            />
          </div>
          <div className={styles.formContainerDiv}>
            <label>Telephone</label>
            <input
              type="text"
              name="telephone"
              value={inputText.telephone}
              onChange={handleChange}
              className={styles.firstname}
            />
          </div>
          <div className={styles.formContainerDiv}>
            <label>Your Email</label>
            <input
              type="text"
              name="email"
              value={inputText.email}
              className={styles.firstname}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formContainerDiv}>
            <label>Your Message</label>
            <textarea
              cols={35}
              name="message"
              value={inputText.message}
              className={styles.textarea}
              onChange={handleChange}
            />
          </div>
          <div className={styles.sendIcon}>
            <button
              className={styles.formsubmit}
              onClick={handleClick}
              disabled={isSubmitting}
            >
              <Icon icon={sendCircle} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
