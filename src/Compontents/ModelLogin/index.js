import './index.css'
import {useState,useRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../Helpers/notify';
function Model({ closeModel, onSubmit, defaultValue }) {
    const modelRef = useRef(null);
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
   //function to close the model
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

    return (
        <div className='login_model_container' ref = {modelRef} onClick={(e) => {
            if (e.target.className === 'login_model_container') {
                CloseModel();
            }
        }}>
            <div className='login_model'>
                <div className='close'>
                    <CloseIcon className='closeIconlogin' onClick={CloseModel} />
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
                        <a href="/reset-password">Reset Password</a>
                        <a href="/signup">Signup</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Model;
