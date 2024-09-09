// import React, { useState } from 'react';
// import { Icon } from '@iconify/react';
// import sendCircle from '@iconify/icons-mdi/send-circle';
// import styles from './form.module.css';
// import { notify } from '../../Helpers/notify';
// import { ToastContainer } from 'react-toastify';

// function Form() {
//   const [inputText, setInputText] = useState({
//     firstname: "",
//     lastname: "",
//     telephone: "",
//     email: "",
//     message: ""
//   });

//   // Function to handle form submission
//   const handleClick = async (e) => {
//     e.preventDefault(); // Prevent page refresh on form submission
//     try {
//       const response = await fetch('http://localhost:5000/api/messages/messages', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(inputText), // Send form data
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setInputText({ firstname: " ", lastname: " ", telephone:" ", email: " ", message: " " }); // Reset form fields
//         const notification ='Message sent successfully!';
//         notify(notification);
//       } else {
//         console.log(`Failed to send message: ${result.error}`);
//       }
//     } catch (error) {
//       console.error('Error sending data:', error);
//       //alert('An error occurred while sending the message.');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputText((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   return (
//     <>
//     <form className={styles.form}>
//       <h2 className={styles.formh2}>Send us a message</h2> 
//       <div className={styles.formContainer}>
//       <div className={styles.formContainerDiv}>
//          <label>First Name</label>
//          <input type='text' name='firstname' onChange={handleChange} className={styles.firstname} placeholder='Enter First Name'/>
//       </div>
//      <div className={styles.formContainerDiv}>
//          <label>Last Name</label>
//          <input type='text' name='lastname'  onChange={handleChange} className={styles.firstname} placeholder='Enter Last Name'/>
//       </div>
//       <div className={styles.formContainerDiv}>
//          <label>Telephone</label>
//          <input type='text' name='telephone'  onChange={handleChange} className={styles.firstname} placeholder='Enter Tel Number'/>
//       </div>
//       <div className={styles.formContainerDiv}>
//          <label>Your Email</label>
//          <input type='text' name='email'  className={styles.firstname} onChange={handleChange} placeholder='Enter Your Email'/>
//       </div>
//       <div className={styles.formContainerDiv}>
//          <label>Your Message</label>
//          <textarea cols={35} type='textarea' name='message'  className={styles.textarea} onChange={handleChange} placeholder='Enter Your message'/>
//       </div>
//       <div className={styles.sendIcon}><Icon className={styles.formsubmit} icon={sendCircle} onClick={handleClick} /></div>
//       </div>
//     </form>                 
//     < ToastContainer position='top-center'/>
//     </>
//   );
// }

// export default Form;


import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import sendCircle from '@iconify/icons-mdi/send-circle';
import styles from './form.module.css';
import { notify } from '../../Helpers/notify';
import { ToastContainer } from 'react-toastify';

function Form() {
  const [inputText, setInputText] = useState({
    firstname: "",
    lastname: "",
    telephone: "",
    email: "",
    message: ""
  });

  // Function to handle form submission
  const handleClick = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      const response = await fetch('http://localhost:5000/api/messages/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputText), // Send form data
      });
      const result = await response.json();
      if (response.ok) {
        setInputText({ firstname: "", lastname: "", telephone: "", email: "", message: "" }); // Reset form fields to empty
        const notification ='Message sent successfully!';
        notify(notification);
      } else {
        console.log(`Failed to send message: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle error here
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
            type='text'
            name='firstname'
            value={inputText.firstname} // Add value to bind with state
            onChange={handleChange}
            className={styles.firstname}
            placeholder='Enter First Name'
          />
        </div>
        <div className={styles.formContainerDiv}>
          <label>Last Name</label>
          <input
            type='text'
            name='lastname'
            value={inputText.lastname} // Add value to bind with state
            onChange={handleChange}
            className={styles.firstname}
            placeholder='Enter Last Name'
          />
        </div>
        <div className={styles.formContainerDiv}>
          <label>Telephone</label>
          <input
            type='text'
            name='telephone'
            value={inputText.telephone} // Add value to bind with state
            onChange={handleChange}
            className={styles.firstname}
            placeholder='Enter Tel Number'
          />
        </div>
        <div className={styles.formContainerDiv}>
          <label>Your Email</label>
          <input
            type='text'
            name='email'
            value={inputText.email} // Add value to bind with state
            className={styles.firstname}
            onChange={handleChange}
            placeholder='Enter Your Email'
          />
        </div>
        <div className={styles.formContainerDiv}>
          <label>Your Message</label>
          <textarea
            cols={35}
            name='message'
            value={inputText.message} // Add value to bind with state
            className={styles.textarea}
            onChange={handleChange}
            placeholder='Enter Your message'
          />
        </div>
        <div className={styles.sendIcon}>
          <Icon className={styles.formsubmit} icon={sendCircle} onClick={handleClick} />
        </div>
      </div>
    </form>                 
    <ToastContainer position='top-center'/>
    </>
  );
}

export default Form;

   
