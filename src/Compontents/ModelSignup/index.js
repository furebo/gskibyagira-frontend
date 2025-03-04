import './index.css';
import { useState } from "react";
import { notify } from '../../Helpers/notify';
import CloseIcon from '@mui/icons-material/Close';
function SignupModel({closeModel,onSubmit,defaultValue}){
    const [loading, setLoading] = useState(false); // Loading state
    const[signupFormState,setSignupFormState] = useState(defaultValue || {
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })
    function handleChange(e){
        setSignupFormState({
         ...signupFormState,
        [e.target.name]:e.target.value
        })
     }
     //let create the state for errors
    const [errors,setErrors] = useState("");
      //let validate the form's inputs fields 
      const validateForm = ()=>{
        if(signupFormState.firstName && signupFormState.lastName && signupFormState.email && signupFormState.password){
            //if all fields are filled we set errors to be empty
            setErrors("");
            return true
        }else{
            //if all fields are not filled let create the array of empty fields.
            let arrOfEmptyFields = [];
            //let create the array from formState and loop through its key value pairs
            for(const[key,value] of Object.entries(signupFormState)){
                //if a key doesn't have a value let push it in arrOfEmptyFields array.
                if(!value){
                    arrOfEmptyFields.push(key)
                }  
            }
            //Now let make the value of errors statefull variable to a string from arrOfEmptyFields.
            setErrors(arrOfEmptyFields.join(", "))
            return false
        }
    }
    async function handleSubmit(e){
        e.preventDefault()
        //let avoid the page to submit if all fields are not filled
        if(!validateForm()) {
            return;
        }
        //onSubmit(signupFormState);
        //closeModel()
        setLoading(true); // Start loading
        try {
            const response = await fetch('https://gskibyagira-backend.onrender.com/api/users/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupFormState)
            });

            if (response.ok) {
                const message = "The user is registered successfully.";
                notify(message);
                closeModel();
            } else {
                throw new Error('Failed to register user');
            }  
        } catch (error) {
            console.error("Error registering the user:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    return(
        <div className='signup-model-container' onClick={(e)=>{
            if(e.target.className==='signup-model-container'){
                closeModel()
            }
        }}>
        <div className='signup-model'>
        <div className='close'><CloseIcon className='closeIcon' onClick= {closeModel} /></div>
            <form>
                <h2>Signup</h2>
                <div className='signup-form-group'>
                    <label htmlFor='First_Name'>First Name</label>
                    <input name='firstName' type="text" value={signupFormState.firstName} onChange={handleChange}/>
                </div>
                <div className='signup-form-group'>
                    <label htmlFor='Second_Name'>Last Name</label>
                    <input name='lastName' type="text" value={signupFormState.lastName} onChange={handleChange}/>
                </div>
                
                <div className='signup-form-group'>
                    <label htmlFor='Email'>Email</label>
                    <input name='email' type="text" value={signupFormState.email} onChange={handleChange}/>
                </div>
                <div className='signup-form-group'>
                    <label htmlFor='Password'>Password</label>
                    <input name='password' type='password' value={signupFormState.password} onChange={handleChange}/>
                </div>
                {errors && <div className='error'>{`Please include: ${errors}`}</div>}
                <button onClick={handleSubmit} className="signup_btn" type='submit' disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>   
            </form>
        </div>
    </div>
    )
}
export default SignupModel;