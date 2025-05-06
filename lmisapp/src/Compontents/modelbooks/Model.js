import './Model.css'
import {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import { notify } from '../../Helpers/notify';

function Model({closeModel,defaultValue}){
    const [loading, setLoading] = useState(false);
    const[formState,setFormState] = useState(defaultValue || {
        Book_Type:'',
        Book_Level:'',
        Book_Number:'', 
        Student_Name:'',
        Student_Class:'',
        Borrowing_Date:'',
        Return_Date:''
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
        if(formState.Book_Type && formState.Book_Level && formState.Book_Number && formState.Student_Class && formState.Student_Name && formState.Borrowing_Date && formState.Return_Date){
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

   async function handleSubmit(e){
        e.preventDefault()
        
        //let avoid the page to submit if all fields are not filled
        if(!validateForm()) {
            return
        }
        setLoading(true);
        //let send data to the database
        // https://gskibyagira-backend.onrender.com
        try {
            const response = await fetch('https://gskibyagira-backend.onrender.com/api/books/borrowbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Book_Type: formState.Book_Type,
                    Book_Level: formState.Book_Level,
                    Book_Number: formState.Book_Number,
                    Student_Name: formState.Student_Name,
                    Student_Class:formState.Student_Class, 
                    Borrowing_Date: formState.Borrowing_Date,
                    Return_Date:formState.Return_Date
                })
            });
            
            console.log(response);

            if (response.ok) {
                const message = "The Book borrowed by this Student is recorded successfully."
                closeModel();
                notify(message);
            }else{
                throw new Error('Failed to save data');
            } 
        } catch (error) {
            console.error("Error saving data:", error);
            // Handle the error appropriately (e.g., show an error message)
        }finally {
            setLoading(false); // Re-enable button after request finishes
        }
    }
     //Function to format the date
     function formatDateForInput(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    return (
        <div className='books_model_container' onClick={(e)=>{
            if(e.target.className==='books_model_container'){
                closeModel()
            }
        }}>
             <div className='books_model'>
                <h2 className='book_borrowing'>Book Borrowing</h2>
             <div className='close'><CloseIcon className='closeIcon' onClick= {closeModel} /></div>
                  <form>
                    <div className="books_form_group">
                        <label htmlFor="booktype">Book Type</label>
                        <input name='Book_Type' type="text" value={formState.Book_Type} onChange={handleChange}/>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="booklevel">Book Level</label>
                        <select name='Book_Level' type="text" value={formState.Book_Level} onChange={handleChange}>
                            <option>Nursary</option>
                            <option>P1</option>
                            <option>P2</option>
                            <option>P3</option>
                            <option>P4</option>
                            <option>P5</option>
                            <option>P6</option>
                            <option>S1</option>
                            <option>S2</option>
                            <option>S3</option>
                            <option>S4</option>
                            <option>S5</option>
                            <option>S6</option>

                        </select>
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
                        <select name='Student_Class' type="text" value={formState.Student_Class} onChange={handleChange}>
                            <option>N1</option>
                            <option>N2</option>
                            <option>N3</option>
                            <option>P1A</option>
                            <option>P1B</option>
                            <option>P1C</option>
                            <option>P1D</option>
                            <option>P2A</option>
                            <option>P2B</option>
                            <option>P2C</option>
                            <option>P3A</option>
                            <option>P3B</option>
                            <option>P3C</option>
                            <option>P4A</option>
                            <option>P4B</option>
                            <option>P4C</option>
                            <option>P5A</option>
                            <option>P5B</option>
                            <option>P6A</option>
                            <option>P6B</option>
                            <option>S1A</option>
                            <option>S1B</option>
                            <option>S1C</option>
                            <option>S1D</option>
                            <option>S2A</option>
                            <option>S2B</option>
                            <option>S2C</option>
                            <option>S3A</option>
                            <option>S3B</option>
                            <option>S4LFK</option>
                            <option>S4MCB</option>
                            <option>S5LFK</option>
                            <option>S5MCB</option>
                            <option>S6LFK</option> 
                            <option>S6MCB</option> 
                            <option>Class Teacher</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="borowingdate">Borrowing Date</label>
                        <input name='Borrowing_Date' type="date" value={formatDateForInput(formState.Borrowing_Date)} onChange={handleChange} />
                    </div>
                    <div className="books_form_group">
                        <label htmlFor="returndate">Return Date</label>
                        <input name='Return_Date' type="date" value={formatDateForInput(formState.Return_Date)} onChange={handleChange} />
                    </div>
        
                    {errors && <div className='error'>{`Please include: ${errors}`}</div>}

                    <button disabled={loading} onClick={handleSubmit} className="books_btn" type="sumbit">{loading ? "Sumbitting..." : "Sumbit"}</button>
                  </form>
                  
             </div>
             
        </div>
    )
}

export default Model;