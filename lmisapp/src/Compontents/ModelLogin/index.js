import './index.css';
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import SignupModel from "../ModelSignup";
import ForgotPasswordModel from '../ModelForgetPassword';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function Model({ closeModel, onSubmit, defaultValue }) {
    
 const notify = (message) =>{ toast.success(message,
        {
            style: { 
                background: 'green',
                color:'white',
                width:'500px',
                marginRight:'100px',
                marginTop:'50px',
            
             }
        })   
    }
    const [signupModelOpen, setSignupModelOpen] = useState(false);
    const [forgotPasswordModelOpen, setForgotPasswordModelOpen] = useState(false);
    const navigate = useNavigate();
    const [LoginFormState, setLoginFormState] = useState(defaultValue || {
        Email: '',
        Password: '',
        Role: '',
    });
    const [errors, setErrors] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [loading, setIsLoading] = useState(false);
    const [resendLoading, setIsResendLoading] = useState(false);
    const handleChange = (e) => {
        setLoginFormState({
            ...LoginFormState,
            [e.target.name]: e.target.value,
        });
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!LoginFormState.Email || !LoginFormState.Password ) {
            setErrors("All fields are required.");
            return;
        }
        setIsLoading(true);
        fetch('https://gskibyagira-backend.onrender.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: LoginFormState.Email,
                password: LoginFormState.Password,
                role: LoginFormState.Role,
            }),
        })
        .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                // Show error from backend if available
                throw new Error(data.message || 'Login failed');
              }
            return data;
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                notify("You are logged in successfully!");
                navigate('/dashboard');
                closeModel();
            } else {
                throw new Error('Token not found');
            }
        })
        .catch((error) =>{
            setErrors(error.message);
        })
        .finally(() =>{
            setIsLoading(false);
        });
    };

    const handleGoogleSuccess = (response) => {
        const credentialResponse = jwtDecode(response.credential); // Decode the token
        console.log("Google User:", credentialResponse);

        fetch('https://gskibyagira-backend.onrender.com/api/auth/google-login', { 
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

    const handleGoogleFailure = (error) => {
        console.error("Google Login Failed:", error);
        notify("Google login failed.");
    };
    //function to handle the resent of email verification  
    const handleResendVerification = () => {
        setIsResendLoading(true);
      
        fetch('https://gskibyagira-backend.onrender.com/api/users/resend-verification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: LoginFormState.Email })
        })
          .then(res => res.json().then(data => {
            if (res.ok) {
              notify(data.message );
            } else {
              notify(data.message || 'Failed to resend verification email.');
            }
          }))
          .catch(() => {
            notify('Something went wrong. Please try again.');
          })
          .finally(() => {
            setIsResendLoading(false);
            setErrors("");
            setIsResendLoading(false);
          });
      };
       
    return (
        <GoogleOAuthProvider clientId="223545888715-9em22gouqkrdsamedaiqr14qj4ma0lo1.apps.googleusercontent.com">
              <ToastContainer 
      position="top-center" autoClose={5000}
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover 
      theme="colored" 
      />
            <div className='login_model_container'>
                <div className='login_model'>
                    <div className='close'>
                        <CloseIcon className='closeIconlogin' onClick={closeModel} />
                    </div>
                    <hr></hr>
                    <form>
                        <h2>Login</h2>
                        <div className="login_form_group">
                            <label htmlFor="email">Enter Email</label>
                            <input name='Email' type="email" value={LoginFormState.Email} onChange={handleChange} />
                        </div>
                        <div className="login_form_group password-input">
                        <label htmlFor="password">Enter Password</label>
                        <div className="password-toggle-wrapper">
                            <input 
                                name='Password' 
                                type={showPassword ? "text" : "password"} 
                                value={LoginFormState.Password} 
                                onChange={handleChange} 
                            />
                            <IconButton onClick={togglePasswordVisibility} className="icon-button">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </div>
                        </div>
                        {errors && <div className='error'>{errors}</div>}
                        <div className={errors === 'Please verify your email before logging in.' ? 'ResendVerificationEmail' : 'hide-verification-button'}>
                              {errors === 'Please verify your email before logging in.' && (
                               <button type="submit" disabled={resendLoading} className="resend-verification-btn" onClick={handleResendVerification}> {resendLoading? "Loading ..." : "Resend Verification Email ?"}</button>
                            )}

                        </div>
                        <button disabled={loading} onClick={handleSubmit} className={errors === 'Please verify your email before logging in.' ? 'hide-verification-button' : 'login_btn'} type="submit">{loading? "Loading ..." : "Sumbit"}</button>
                        
                        {/* Google Login Button */}
                        <div className="google_btn_container">
                        <GoogleLogin
                               onSuccess={handleGoogleSuccess}
                               onError={handleGoogleFailure}
                               useOneTap
                               flow="implicit"
                               redirectUri="https://gskibyagira-backend.onrender.com/api/auth/google-login"  // Update this to match Google Console
                           />
                        </div>
                        <div className="login-links">
                            <h4 className='sugnup_button' onClick={() => setForgotPasswordModelOpen(true)}>Forgot Password?</h4>
                            <h2 className='sugnup_button' onClick={() => setSignupModelOpen(true)}>Signup</h2>
                        </div>
                    </form>
                </div>
            </div>
            {signupModelOpen && <SignupModel closeModel={() => setSignupModelOpen(false)} />}
            {forgotPasswordModelOpen && <ForgotPasswordModel forgetPasswordcloseModel={() => setForgotPasswordModelOpen(false)} />}
        </GoogleOAuthProvider>
    );
}

export default Model;