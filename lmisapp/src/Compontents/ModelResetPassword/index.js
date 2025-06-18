import './index.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import { notify } from '../../Helpers/notify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function ResetPasswordModel({ closeModel }) {
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassWord, setShowConfirmPassword] = useState(false);
//functions to toggle password visibility
const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev );
}
//function to toggle confirm password visibility
const toggleConfirmPasswordVisibility = () =>{
    setShowConfirmPassword((prev) => !prev);
}
    function handleChange(e) {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    }

    const validateForm = () => {
        if (!formState.newPassword || !formState.confirmPassword) {
            setErrors("All fields are required");
            return false;
        }
        if (formState.newPassword !== formState.confirmPassword) {
            setErrors("Passwords do not match");
            return false;
        }
        return true;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const response = await fetch(`https://gskibyagira-backend.onrender.com/api/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    newPassword: formState.newPassword,
                }),
            });

            if (!response.ok) throw new Error('Failed to reset password');
            
            notify("Password reset successfully!");
            closeModel();
            navigate('/'); // Redirect to homepage
        } catch (error) {
            setErrors('Error resetting password');
            console.error('Error:', error);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='login_model_container'>
            <div className='login_model'>
                <div className='close'>
                    <CloseIcon className='closeIconlogin' onClick={()=>navigate('/')} />
                </div>
                <hr></hr>
                <form>
                    <h2>GS Kibyagira BMIS Reset Password</h2>
                    <div className="passwordreset_form_group">
                        <label htmlFor="newPassword">New Password</label>
                        <div >
                        <input
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            value={formState.newPassword}
                            onChange={handleChange}
                        />
                        <IconButton onClick={togglePasswordVisibility} className='iconbtn'>
                            {showPassword ? <VisibilityOff  /> : <Visibility  />}
                        </IconButton>
                        </div>
                    </div>
                    <div className="passwordreset_form_group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div>
                        <input
                            name='confirmPassword'
                            type={showConfirmPassWord ? "text" : "password"}
                            value={formState.confirmPassword}
                            onChange={handleChange}
                        />
                        <IconButton onClick={toggleConfirmPasswordVisibility} className='iconbtn'>
                            {showConfirmPassWord ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </div>
                    </div>
                    {errors && <div className='error'>{errors}</div>}
                    <button disabled = {isLoading} onClick={handleSubmit} className="login_btn" type="submit">{isLoading ? 'Saving...' : 'Submit'}</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordModel;
