import React,{useRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom';
import './borrowbook.css';
function Signup (){ 
    const modelRef = useRef(null);
    let navigate = useNavigate()
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
   
    return (
        <>
        <div className='welcome'>
           <marquee><h2>Welcome To GS KIBYAGIRA-BURUHUKIRO Library Management Information System</h2></marquee>
        </div>
       
        <div className='model-container' ref = {modelRef}>
            <div className='model'>
            <div className='close'><CloseIcon className='closeIcon' onClick= {CloseModel} /></div>
                <form>
                    <div className='form-group'>
                        <label htmlFor='Firstname'>First Name</label>
                        <input name='firstname'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input name='lastname'/>
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='student class'>Student Class</label>
                        <input name='student class'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='borrowing date'>Borrowing Date</label>
                        <input name='borrow date' type='date'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Book Type'>Book Type</label>
                        <input name='book type'/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Book Level</label>
                        <select>
                            <option value="live">Nursery</option>
                            <option value="draft">S1</option>
                            <option value="error">S2</option>
                            <option value="error">S3</option>
                            <option value="error">S4</option>
                            <option value="error">S5</option>
                            <option value="error">S6</option>
                        </select>
                    </div>
   
                    <button type='submit' className='btn' >Submit</button>
                   
                </form>
            </div>
        </div>
      </>
    )
}
export default Signup
