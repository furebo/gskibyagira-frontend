import React,{useRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
import './Signup.css';
function Signup (){ 
    const modelRef = useRef(null);
    let navigate = useNavigate()
    function CloseModel(){
        
        const isHidden = () => modelRef.current.classList.contains("box--hidden");
        if (!isHidden()) {
            modelRef.current.classList.add("box--hidden");
            setTimeout(() =>{
                modelRef.current.style.visibility = 'hidden';  
                navigate('/')
            }, 1000);
            
        } else {
            modelRef.current.classList.remove("box--hidden")
        }
    }
    return (
        <>
        <div className='welcome'>
            <marquee><h2>Welcome To GS KIBYAGIRA-BURUHUKIRO Library Management Information System</h2></marquee>
        </div>
        <div className='model-container' ref = {modelRef}>
            <div className='model'>
            <div className='close'><CloseIcon className='closeIcon' onClick= {CloseModel} /></div>
                <form>
                    <div className='form-group'>
                        <label htmlFor='page'>First Name</label>
                        <input name='page'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='page'>Last Name</label>
                        <input name='page'/>
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='page'>Email</label>
                        <input name='page'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='page'>Password</label>
                        <input name='page' type='password'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Role</label>
                        <select>
                            <option value="live">Teacher</option>
                            <option value="draft">Student</option>
                            <option value="error">Staff Member</option>
                            <option value="error">Guest</option>
                        </select>
                    </div>
                    <button type='submit' className='btn'>Submit</button>   
                </form>
            </div>
        </div>
      </>
    )
}
export default Signup
