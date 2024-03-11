import './Model.css'
import {useState} from 'react';

function Model({closeModel,onSubmit,defaultValue}){
    const[formState,setFormState] = useState(defaultValue || {
        Book_Type:'',
        Book_Level:'',
        Book_Number:'',
        Student_Name:'',
        Student_Class:'',
        Borrowing_Date:''
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
        if(formState.Book_Type && formState.Book_Level && formState.Book_Number && formState.Student_Class && formState.Student_Name && formState.Borrowing_Date){
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

    function handleSubmit(e){
        e.preventDefault()
        //let avoid the page to submit if all fields are not filled
        if(!validateForm()) {
            return
        }
        onSubmit(formState);
        closeModel()
    }
    return (
        <div className='books_model_container' onClick={(e)=>{
            if(e.target.className==='books_model_container'){
                closeModel()
            }
        }}>
             <div className='books_model'>
                  <form>
                    <div className="books_form_group">
                        <label htmlFor="booktype">Book Type</label>
                        <input name='Book_Type' type="text" value={formState.Book_Type} onChange={handleChange}/>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="booklevel">Book Level</label>
                        <input name='Book_Level' type="text" value={formState.Book_Level} onChange={handleChange}/>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="booknumber">Book Number</label>
                        <input name='Book_Number' type="text" value={formState.Book_Number} onChange={handleChange} />
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="studentname">Student Name</label>
                        <input name='Student_Name' type="text" value={formState.Student_Name} onChange={handleChange}/>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="studentclass">Student Class</label>
                        <input name='Student_Class' type="text" value={formState.Student_Class} onChange={handleChange}/>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="borowingdate">Borrowing Date</label>
                        <input name='Borrowing_Date' type="text" value={formState.Borrowing_Date} onChange={handleChange} />
                    </div>
        
                    {errors && <div className='error'>{`Please include: ${errors}`}</div>}

                    <button onClick={handleSubmit} className="books_btn" type="sumbit">Sumbit</button>
                  </form>
             </div>
        </div>
    )
}

export default Model;