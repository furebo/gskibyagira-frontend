import './index.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { notify } from '../../Helpers/notify';
import SignupModel from "../ModelSignup";
import ForgotPasswordModel from '../ModelForgetPassword';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function Model({ closeModel, onSubmit, defaultValue }) {
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
        .then(response => response.ok ? response.json() : Promise.reject('Login failed'))
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
            setErrors('Invalid login credentials');
            console.error('Error:', error);
        })
        .finally(() =>{
            setIsLoading(false);
        });
    };

    const handleGoogleSuccess = (response) => {
        const credentialResponse = jwtDecode(response.credential); // Decode the token
        console.log("Google User:", credentialResponse);

        fetch('https://gskibyagira-backend.onrender.com/api/auth/google-login', { // Replace with your backend endpoint
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
    return (
        <GoogleOAuthProvider clientId="223545888715-9em22gouqkrdsamedaiqr14qj4ma0lo1.apps.googleusercontent.com">
            <div className='login_model_container'>
                <div className='login_model'>
                    <div className='close'>
                        <CloseIcon className='closeIconlogin' onClick={closeModel} />
                    </div>
                    <form>
                        <h2>Login</h2>
                        <div className="login_form_group">
                            <label htmlFor="email">Enter Email</label>
                            <input name='Email' type="email" value={LoginFormState.Email} onChange={handleChange} />
                        </div>
                        <div className="login_form_group password-input">
                        <label htmlFor="password">Enter Password</label>
                        <div className="password-container">
                            <input 
                                name='Password' 
                                type={showPassword ? "text" : "password"} 
                                value={LoginFormState.Password} 
                                onChange={handleChange} 
                            />
                            <IconButton onClick={togglePasswordVisibility} className="password-toggle">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </div>
                        </div>
                        <div className="login_form_group">
                            <label htmlFor="role">Choose your role</label>
                            <select name='Role' value={LoginFormState.Role} onChange={handleChange}>
                                <option>Teacher</option>
                                <option>Staff</option>
                                <option>Student</option>
                                <option>Other</option>
                            </select>
                        </div>
                        {errors && <div className='error'>{errors}</div>}
                        <button disabled={loading} onClick={handleSubmit} className="login_btn" type="submit">{loading? "Loading ..." : "Sumbit"}</button>
                        
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
