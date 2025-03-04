//import './index.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import { notify } from '../../Helpers/notify';

function ResetPasswordModel({ closeModel }) {
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState("");

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
           // closeModel();
            navigate('/login'); // Redirect to login
        } catch (error) {
            setErrors('Error resetting password');
            console.error('Error:', error);
        }
    }

    return (
        <div className='login_model_container'>
            <div className='login_model'>
                <div className='close'>
                    <CloseIcon className='closeIconlogin' onClick={()=>navigate('/')} />
                </div>
                <form>
                    <h2>Reset Password</h2>
                    <div className="login_form_group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            name='newPassword'
                            type="password"
                            value={formState.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="login_form_group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            name='confirmPassword'
                            type="password"
                            value={formState.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    {errors && <div className='error'>{errors}</div>}
                    <button onClick={handleSubmit} className="login_btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordModel;
