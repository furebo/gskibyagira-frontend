import './index.css';
import { useState } from "react";
import { notify } from '../../Helpers/notify';
import CloseIcon from '@mui/icons-material/Close';
import {ToastContainer,toast} from 'react-toastify';

function SignupModel({ closeModel, defaultValue }) {
    const [loading, setLoading] = useState(false);
    const [signupFormState, setSignupFormState] = useState(defaultValue || {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState("");

    function handleChange(e) {
        setSignupFormState({
            ...signupFormState,
            [e.target.name]: e.target.value
        });
    }

    const validateForm = () => {
        if (signupFormState.firstName && signupFormState.lastName && signupFormState.email && signupFormState.password) {
            setErrors("");
            return true;
        } else {
            let arrOfEmptyFields = [];
            for (const [key, value] of Object.entries(signupFormState)) {
                if (!value) arrOfEmptyFields.push(key);
            }
            setErrors(arrOfEmptyFields.join(", "));
            return false;
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch('https://gskibyagira-backend.onrender.com/api/users/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupFormState)
            });

            if (response.ok) {
                const message = "The user is registered successfully.";
                console.log("Triggering notify:", message);
                //notify(message);
                toast.success("User registered successfully!"); // Call this after successful signup
                setTimeout(() => {
                    closeModel(); // Close modal after 2 seconds
                }, 8000);
            } else {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error("Error registering the user:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <ToastContainer/>
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
                        <input name='email' type="text" value={signupFormState.email} onChange={handleChange} />
                    </div>
                    <div className='signup-form-group'>
                        <label htmlFor='Password'>Password</label>
                        <input name='password' type='password' value={signupFormState.password} onChange={handleChange} />
                    </div>
                    {errors && <div className='error'>{`Please include: ${errors}`}</div>}
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
