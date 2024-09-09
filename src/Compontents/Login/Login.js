import React,{useContext, useReducer, useRef, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate,Link} from 'react-router-dom';
import './Login.css';
import {AuthContext} from '../../Contexts/AuthContext';
import { SET_AUTHENTICATION, SET_ERROR } from '../../Actions/types';

const {BACKEND_URL} = process.env
function Login (){ 
    const modelRef = useRef(null);
    let navigate = useNavigate();
    const {auth,dispatch} = useContext(AuthContext) 
    const[values,setValues] = useState({
        password:'',
        email:''
    })

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

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]:event.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const body = {email:values.email,password:values.password}
        if(values.email === ''||values.password === ''){
            dispatch({type:SET_ERROR, payload:'Email Is Required.'})
            { toast.info("Email and Password are required.",{
                 style: { 
                     background: 'red',
                     color:'white',
                     width:'400px',
                     marginRight:'50px'
                    }
                })
            }
        }else{
            const response = await fetch(`${BACKEND_URL}/login`,{
                method:"post",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify(body)
            })
            const jsonData = await response.json();
            if(jsonData.user !== undefined){
              localStorage.setItem("userId",jsonData.user.id);
              localStorage.setItem("userToken",jsonData.token);
              localStorage.setItem("userData",JSON.stringify(jsonData.user));      
              dispatch({type: SET_AUTHENTICATION, user:jsonData.user, token:jsonData.token })
              { toast.success("You are loged in successfully.",{
                style: { 
                    background: 'green',
                    color:'white',
                    width:'400px',
                    marginRight:'50px'
                   }
               })
           }
              setTimeout(() => {
              navigate('/admin');
              }, 4000) 
            }
        }
    }

    return (
        <>
        <div className='welcome'>
           <h2>Welcome To LAMIS GS KIBYAGIRA </h2>
        </div>
        <div className='model-container' ref = {modelRef}>
            <div className='model'>
            <div><h3>Login with <span className='google'><Link to='http://localhost:5000/google'>Google</Link></span></h3></div>
            <div className='close'><CloseIcon className='closeIcon' onClick= {CloseModel} /></div>
                <form onSubmit={handleSubmit}>
                    
                    <div className='form-group'>
                        <label htmlFor='page'>Email</label>
                        <input className="forminput" name='page' onChange={handleChange('email')}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='page'>Password</label>
                        <input className="forminput" name='page' type='password' onChange={handleChange('password')}/>
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
        < ToastContainer position="top-left" />
      </>
    )
}
export default Login
