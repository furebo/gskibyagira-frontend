import './index.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { notify } from '../../Helpers/notify';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordModel({ closeModel }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email');
            return;
        }

        try {
            const response = await fetch('https://gskibyagira-backend.onrender.com/api/reset/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error('Failed to send reset email');

            notify("Password reset link sent! Check your email.");
            setTimeout(() => {
                navigate('/'); // Redirect after 5 seconds
            }, 5000);
            closeModel()
        } catch (error) {
            setError('Error sending reset email');
            console.error('Error:', error);
        }
    }
    function closemodel(){
        navigate('/login');
    }
    return (
        <>
        <div className="kibyagiraDashboard">GS Kibyagira Buruhukiro</div>
        <div className='login_model_container'>
            <div className='login_model'>
                <div className='close'>
                    <CloseIcon className='closeIconlogin' onClick={()=>navigate('/')} />
                </div>
                <form>
                    <h2>Forgot Password</h2>
                    <div className="login_form_group">
                        <label htmlFor="email">Enter your email</label>
                        <input
                            name='email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {error && <div className='error'>{error}</div>}
                    <button onClick={handleSubmit} className="login_btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default ForgotPasswordModel;
