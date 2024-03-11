import React,{useRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate,Link} from 'react-router-dom';
import './Login.css';
function Login (){ 
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
            <h2>Welcome to GS KIBYAGIRA-BURUHUKIRO Library Management Information System</h2>
        </div>
        <div className='model-container' ref = {modelRef}>
            <div className='model'>
            <div><h3>Login with <span className='google'><Link to='http://localhost:5000/google'>Google</Link></span></h3></div>
            <div className='close'><CloseIcon className='closeIcon' onClick= {CloseModel} /></div>
                <form>
                    
                    <div className='form-group'>
                        <label htmlFor='page'>Email</label>
                        <input className="forminput" name='page'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='page'>Password</label>
                        <input className="forminput" name='page' type='password'/>
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
                   <section className='footer1'>
                    <div>
                    <h3 className='password_reset'>Reset Password</h3>
                    </div>
                    <div>
                        <h4 className='create_account'>
                            <Link to="/signup">Create Account</Link>
                        </h4>
                    </div>
                   </section>   
                </form>
            </div>
        </div>
      </>
    )
}
export default Login
