import './index.css';
import { useState } from "react";
import { notify } from '../../Helpers/notify';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import { Visibility, VisibilityOff, MailOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function SignupModel({ closeModel, defaultValue }) {
    const [loading, setLoading] = useState(false);
    const [signupFormState, setSignupFormState] = useState(defaultValue || {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '' // Add confirm password field
    });

    const [errors, setErrors] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for password visibility

    function handleChange(e) {
        setSignupFormState({
            ...signupFormState,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const validateForm = () => {
        const { firstName, lastName, email, password, confirmPassword } = signupFormState;
        
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            let emptyFields = [];
            for (const [key, value] of Object.entries(signupFormState)) {
                if (!value) emptyFields.push(key);
            }
            setErrors(emptyFields.join(", "));
            return false;
        }

        if (password !== confirmPassword) {
            setErrors("Passwords do not match");
            return false;
        }

        setErrors("");
        return true;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await fetch('https://gskibyagira-backend.onrender.com/api/users/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: signupFormState.firstName,
                    lastName: signupFormState.lastName,
                    email: signupFormState.email,
                    password: signupFormState.password,
                }) 
            });

            const data = await response.json();

            if (response.ok) {
                notify(data.message);
                setTimeout(() => {
                    closeModel();
                }, 8000);
            } else {
                notify(data.message);
            }
        } catch (error) {
            notify(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ToastContainer />
            <div 
                className='signup-model-container' 
                onClick={(e) => {
                    if (e.target.classList.contains('signup-model-container')) {
                        if (typeof closeModel === "function") closeModel();
                    }
                }}
            >
                <div className='signup-model'>
                    <div className='close'>
                        <CloseIcon className='closeIcon' onClick={() => { if (typeof closeModel === "function") closeModel(); }} />
                    </div>
                    <hr></hr>
                    <form>
                        <h2>Signup</h2>
                        <div className='signup-form-group'>
                            <label htmlFor='First_Name'>First Name</label>
                            <input name='firstName' type="text" value={signupFormState.firstName} onChange={handleChange} />
                        </div>
                        <div className='signup-form-group'>
                            <label htmlFor='Second_Name'>Last Name</label>
                            <input name='lastName' type="text" value={signupFormState.lastName} onChange={handleChange} />
                        </div>
                        <div className='signup-form-group'>
                            <label htmlFor='Email'>Email</label>
                            <div className='password-toggle-wrapper'>
                            <input name='email' type="text" value={signupFormState.email} onChange={handleChange} />
                            <IconButton className="icon-button">
                               <MailOutline />
                            </IconButton> 
                            </div>
                        </div>
                        <div className='signup-form-group'>
                            <label htmlFor='Password'>Password</label>
                            <div className="password-toggle-wrapper">
                            <input name='password' type={showPassword ? "text" : "password"}  value={signupFormState.password} onChange={handleChange} />
                             <IconButton onClick={togglePasswordVisibility} className="icon-button">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton> 
                            </div>
                        </div>
                        <div className='signup-form-group'>
                            <label htmlFor='Confirm_Password'>Confirm Password</label>
                            <div className="password-toggle-wrapper">
                            <input name='confirmPassword' type={showConfirmPassword ? "text" : "password"} value={signupFormState.confirmPassword} onChange={handleChange} />
                            <IconButton onClick={toggleConfirmPasswordVisibility} className="icon-button">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </div>
                        </div>
                        {errors && <div className='error'>{`Error: ${errors}`}</div>}
                        <button onClick={handleSubmit} className="signup_btn" type='submit' disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignupModel;