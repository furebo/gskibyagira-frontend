import './index.css'
import {useState,useRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../Helpers/notify';
import SignupModel from "../ModelSignup";
import ForgotPasswordModel from '../ModelForgetPassword';
function Model({closeModel,onSubmit, defaultValue }) {
    const [signupModelOpen, setSignupModelOpen] = useState(false);
    const [forgotPasswordModelOpen, setForgotPasswordModelOpen] = useState(false);
    const navigate = useNavigate();
    const [LoginFormState, setLoginFormState] = useState(defaultValue || {
        Email: '',
        Password: '',
        Role: '',
    });

    const [errors, setErrors] = useState("");
    

    function handleChange(e) {
        setLoginFormState({
            ...LoginFormState,
            [e.target.name]: e.target.value,
        });
    }
 
    const validateForm = () => {
        if (LoginFormState.Email && LoginFormState.Password && LoginFormState.Role) {
            setErrors("");
            return true;
        } else {
            let arrOfEmptyFields = [];
            for (const [key, value] of Object.entries(LoginFormState)) {
                if (!value) {
                    arrOfEmptyFields.push(key);
                }
            }
            setErrors(arrOfEmptyFields.join(", "));
            return false;
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        // Send login details to the backend
        //https://gskibyagira-backend.onrender.com
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: LoginFormState.Email,
                password: LoginFormState.Password,
                role: LoginFormState.Role,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Login failed');
                }
            })
            .then((data) => {
                  // Check if the token is in the response
            if (data.token) {
                // Save the token in localStorage
                localStorage.setItem('token', data.token);

                
                console.log('Token stored in localStorage:', data.token);
                const message = "You are logged in successfuly!"
                notify(message);
                navigate('/dashboard');
            } else {
                throw new Error('Token not found');
            }
                onSubmit(LoginFormState); // Call the parent onSubmit with the login state
                closeModel();
            })
            .catch((error) => {
                setErrors('Invalid login credentials');
                console.error('Error:', error);
            });
    }
    const handleSignupModel = () => {
        setSignupModelOpen(true);
       // setIsMobile(false); // Close menu on click
      };
    return (
        <>
        <div className='login_model_container'>
            <div className='login_model'>
                <div className='close'>
                    <CloseIcon className='closeIconlogin' onClick={()=>{
                        closeModel();
                        
                        }} />
                </div>
                <form>
                    <h2>Login</h2>
                    <div className="login_form_group">
                        <label htmlFor="email">Enter Email</label>
                        <input name='Email' type="text" value={LoginFormState.Email} onChange={handleChange} />
                    </div>
                    <div className="login_form_group">
                        <label htmlFor="password">Enter Password</label>
                        <input name='Password' type="password" value={LoginFormState.Password} onChange={handleChange} />
                    </div>
                    <div className="login_form_group">
                        <label htmlFor="role">Choose your role</label>
                        <select name='Role' type="text" value={LoginFormState.Role} onChange={handleChange}>
                            <option>Teacher</option>
                            <option>Staff</option>
                            <option>Student</option>
                            <option>Other</option>
                        </select>
                    </div>
                    {errors && <div className='error'>{`Please include: ${errors}`}</div>}
                    <button onClick={handleSubmit} className="login_btn" type="submit">Submit</button>
                    <button className="google-login">
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" />
                        Login with Google
                    </button>
                    <div className="login-links">
                        <h4 onClick={()=>{
                            setForgotPasswordModelOpen(true);
                            }}>Forgot Password?</h4>
                        <h2 onClick={handleSignupModel}>Signup</h2>
                    </div>
                </form>
            </div>
        </div>
         {signupModelOpen && <SignupModel closeModel={() => setSignupModelOpen(false)} />}
         {forgotPasswordModelOpen && <ForgotPasswordModel forgetPasswordcloseModel={() => setForgotPasswordModelOpen(false)}/>}
         </>
    );
}

export default Model;
