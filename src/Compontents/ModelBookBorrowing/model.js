import './Model.css'
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Model({closeModel,onSubmit,defaultValue}){
    const [book_level,setBook_level] = useState(['Nursary','S1','S2','S3','S4','S5','S6']) 
    const levels = book_level.map(level => level)
    const handleBookLevelChange = (e) => setBook_level(e.target.value)
    const[formState,setFormState] = useState(defaultValue || {
        First_Name:'',
        Last_Name:'',
        Student_Class:'',
        Borrowing_Date:'',
        Book_Type:'',
        
        
    })

    function handleChange(e){
       setFormState({
        ...formState,
       [e.target.name]:e.target.value
       })
       
    }
    //let create the state for errors
    const [errors,setErrors] = useState("")
   
    //let validate the form's inputs fields 
    const validateForm = ()=>{
        if(formState.Book_Type && formState.Book_Number && formState.Student_Class && formState.Student_Name && formState.Borrowing_Date){
            //if all fields are filled we set errors to be empty
            setErrors("");
            return true
        }else{
            //if all fields are not filled let create the array of empty fields.
            let arrOfEmptyFields = [];
            //let create the array from formState and loop through its key value pairs
            for(const[key,value] of Object.entries(formState)){
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

    const notify = () =>{ toast.success("The Book borrowed by this Student is recorded successfully.",
    {
        style: { 
            background: 'green',
            color:'white',
            width:'500px',
            marginRight:'50px',
            marginTop:'50px',
            marginRight:'50px'
         }
    })
    
}

    function handleSubmit(e){
        e.preventDefault()
        //let avoid the page to submit if all fields are not filled
        if(!validateForm()) {
            notify()
            console.log(formState)
            return
        }
       // onSubmit(formState);
        notify()
        closeModel()
    }
    
    return (
        <div className='books_model_container' onClick={(e)=>{
            if(e.target.className==='books_model_container'){
                closeModel()
            }
        }}>
             <div className='books_model'>
                  <form onSubmit={handleSubmit}>
                    <div className="books_form_group">
                        <label htmlFor="First_Name">First Name</label>
                        <input name='First_Name' type="text" value={formState.First_Name} onChange={handleChange}/>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="Last_Name">Last Name</label>
                        <input name='Last_Name' type="text" value={formState.Last_Name} onChange={handleChange}/>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="Student_Class">Borrower Level (student class or teacher)</label>
                        <select onChange={handleChange}>
                        {levels.map((lev,key)=><option value={key}>{lev}</option> )}
                        <option>Teacher</option>
                        </select>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="Borrowing_Date">Borrowing Date</label>
                        <input name='Borrowing_Date' type="date" value={formState.Borrowing_Date} onChange={handleChange}/>
                    </div>
                    <div className='books_form_group'>
                        <label htmlFor='status'>Book Level</label>
                        <select>
                        {levels.map((lev,key)=><option value={key}>{lev}</option> )}
                        </select>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="Book_Type">Book Type</label>
                        <input name='Book_Type' type="text" value={formState.Book_Type} onChange={handleChange} />
                    </div>
        
                    {errors && <div className='error'>{`Please include: ${errors}`}</div>}

                    <button className="books_btn" type="sumbit">Sumbit</button>
                  </form>
             </div>
             < ToastContainer position="top-center" />
        </div>
        
    )
}

export default Model;