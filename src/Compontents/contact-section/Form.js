import React,{useState} from 'react'
import { Icon } from '@iconify/react'
import sendCircle from '@iconify/icons-mdi/send-circle'


import './form.css'
const formInputs = [
  { 
    id: 'name',
    type: 'text',
    label: 'Your name', 
    placeholder: 'Furebo Didace' },
  {
    id: 'tel',
    type: 'tel',
    label: 'Phone number',
    placeholder: '+250784450008',
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email address',
    placeholder: 'you@example.com',
  },
  {
    id: 'message',
    type: 'textarea',
    label: 'Your message',
    placeholder: 'How can we help you? Or you us?',
  },
]

function Form (){
  const[inputText,setInputText] = useState([])
  return (
  
    <form className="form">
      <h2 className="form-h2">Send us a message</h2>
  
      {formInputs.map(input => (
        <label key={input.label} id={input.id} className="form-label">
          {input.label}
  
          {input.type === 'textarea' ? (
            <textarea className="form-textarea" placeholder={input.placeholder} />
          ) : (
            <input
              key={input.id}
              className="form-input"
              type={input.type}
              placeholder={input.placeholder}
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />
          )}
        </label>
      ))}
  
      <Icon className="form-submit" icon={sendCircle} />
  
      {/* <button className="form-submit" type="submit">
        Send message
      </button> */}
    </form>
  )
} 

export default Form
