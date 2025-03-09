import React, { useEffect,useState } from 'react'
import Form from './Form'
import Info from './Info'
import './contact-section.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import MessagesList from '../Messages/MessageList';

function ContactSection(){
  useEffect(()=>{
    AOS.init({duration:2000})
  })

  const [refresh, setRefresh] = useState(false); // 🔄 Refresh state
  return(
  <>
    <div className="contact-section1" data-aos="zoom-in">
      <Form setRefresh={setRefresh} />
      <Info />
    </div>
    <div>
    <MessagesList refresh={refresh} />
    </div>
  </>
)}

export default ContactSection
