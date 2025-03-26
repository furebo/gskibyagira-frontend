import './index.css'
import {useState,useRef} from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
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
        fetch('https://gskibyagira-backend.onrender.com/api/login', {
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

      // Function to handle success google login
      const handleGoogleSuccess = (response) => {
        const credentialResponse = jwtDecode(response.credential); // Decode the token
        console.log("Google User:", credentialResponse);

        fetch('https://gskibyagira-backend.onrender.com/api/google-login', { // Replace with your backend endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: response.credential }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                notify("Google login successful!");
                navigate('/dashboard');
                closeModel();
            }
        })
        .catch(error => console.error('Google login error:', error));
    };

    //Function to handle google login failer
    const handleGoogleFailure = (error) => {
        console.error("Google Login Failed:", error);
        notify("Google login failed.");
    };

    return (
        <GoogleOAuthProvider clientId="952983179610-j65f12ajmemu7jdeoiu8c287gkes9il6.apps.googleusercontent.com">
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
                    
                    <button className="google-login" 
                    onSuccess={handleGoogleSuccess} 
                    onError={handleGoogleFailure}
                     >
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" />
                        Login with Google
                    </button>
                    <div className="login-links">
                        <h4 className='sugnup_button' onClick={()=>{
                            setForgotPasswordModelOpen(true);
                            }}>Forgot Password?</h4>
                        <h2 className='sugnup_button' onClick={handleSignupModel}>Signup</h2>
                    </div>
                </form>
            </div>
        </div>
         {signupModelOpen && <SignupModel closeModel={() => setSignupModelOpen(false)} />}
         {forgotPasswordModelOpen && <ForgotPasswordModel forgetPasswordcloseModel={() => setForgotPasswordModelOpen(false)}/>}
         </ GoogleOAuthProvider>
    );
}

export default Model;
