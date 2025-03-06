import React, { useEffect } from 'react'
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
  return(
  <>
    <div className="contact-section1" data-aos="zoom-in">
      <Form />
      <Info />
    </div>
    <div>
    <MessagesList />
    </div>
  </>
)}

export default ContactSection
