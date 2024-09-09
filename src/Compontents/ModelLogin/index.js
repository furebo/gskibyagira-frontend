import './index.css'
import {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
function Model({closeModel,onSubmit,defaultValue}){
    const[LoginFormState,setLoginFormState] = useState(defaultValue || {
        Email:'',
        Password:'',
        Role:'',
    })

    function handleChange(e){
       setLoginFormState({
        ...LoginFormState,
       [e.target.name]:e.target.value
       })
    }
    //let create the state for errors
    const [errors,setErrors] = useState("")
   
    //let validate the form's inputs fields 
    const validateForm = ()=>{
        if(LoginFormState.Email && LoginFormState.Password && LoginFormState.Role){
            //if all fields are filled we set errors to be empty
            setErrors("");
            return true
        }else{
            //if all fields are not filled let create the array of empty fields.
            let arrOfEmptyFields = [];
            //let create the array from formState and loop through its key value pairs
            for(const[key,value] of Object.entries(LoginFormState)){
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

    function handleSubmit(e){
        e.preventDefault()
        //let avoid the page to submit if all fields are not filled
        if(!validateForm()) {
            return
        }
        onSubmit(LoginFormState);
        closeModel()
    }
    return (
        <div className='login_model_container' onClick={(e)=>{
            if(e.target.className==='login_model_container'){
                closeModel()
            }
        }}>
             <div className='login_model'>
             <div className='close'><CloseIcon className='closeIconlogin' onClick= {closeModel} /></div>
                  <form>
                    <h2>Login</h2>
                    <div className="login_form_group">
                        <label htmlFor="email">Enter Email</label>
                        <input name='Email' type="text" value={LoginFormState.Email} onChange={handleChange}/>
                    </div>
                    <div className="login_form_group">
                        <label htmlFor="password">Enter Password</label>
                        <input name='Password' type="password" value={LoginFormState.Password} onChange={handleChange}/>
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
                    <button onClick={handleSubmit} className="login_btn" type="sumbit">Sumbit</button>
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
    )
}

export default Model;