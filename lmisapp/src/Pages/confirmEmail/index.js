import React from 'react';
import Navbar from '../../Compontents/Navbar';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer, Zoom } from 'react-toastify';


const { REACT_APP_BACKEND_URL } = process.env;


const ConfirmEmail = () => {
    const Navigate = useNavigate();
    const currentLng = localStorage.getItem('i18nextLng');
    const userEmail = sessionStorage.getItem('signedEmail');
    if(!userEmail){
      Navigate('/login');
    }
    const resendConfirmation = () => {
        fetch(`${REACT_APP_BACKEND_URL}/user/resendVerificationEmail`, {email: userEmail}, {
            method: "POST",
            headers: {
              "Accept-Language": currentLng
            }
          })
          .then((result) => {
            if(result.status === 200){
                toast.success(result.data.message, {
                  style: { backgroundColor: "green", color: "white" },
                });
            }
            else{
              toast.info(result.data.message, {
                style: { backgroundColor: "red", color: "white" },
              });
            }
          })
          .catch((err) => {
            toast.info("There is an error", {
              style: { backgroundColor: "red", color: "white" },
            });
          })
    }

    const container = {
        width: '100%',
        marginTop: '10%',
        display: 'flex',

    }
    const subContainer  = {
        width: '50%',
        marginLeft: '30%',

    }
    return (
        <>
      <ToastContainer 
        draggable={true} 
        transition={Zoom} 
        autoClose={3000} 
        position={'top-center'}
      />
        <Navbar/>
        <div style={container}>
            <div style={subContainer}>
            <h1>You are almost in</h1>
            <p style={{marginTop: '3em'}}>The confimation email was sent to <a style={{color:'#0394fc'}}  href={"mailto:"+userEmail}>{userEmail}</a>, Please check your email to confirm!</p>
            <Button variant="contained" color="primary" data-testid="viewHotels-btn" style={{marginTop:'2em'}}>
                      <Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Login</Link>
            </Button>
            <u style={{color: '#0394fc', display:'block', marginTop: '1.5em', cursor:'pointer'}} onClick={() => resendConfirmation()}>Resend confirmation email</u>
            </div>  
        </div>
       </> 
    )
}

export default ConfirmEmail;