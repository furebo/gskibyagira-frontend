import './index.css';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { notify } from '../../Helpers/notify';

function CreateEventModel({closeModel,defaultValue,modelName}){
    const[eventFormState,setEventFormState] = useState(defaultValue || {
        heading:'',
        description:'',
        image_url:"",
        is_active:'',        
    })
    function handleChange(e){
        const { name, value, files } = e.target;
        setEventFormState({
         ...eventFormState,
         [name]: name === 'image_url' ? files[0] : value
        })
     }
     //let create the state for errors
    const [errors,setErrors] = useState("");
      //let validate the form's inputs fields 
      const validateForm = ()=>{
        if(eventFormState.heading && eventFormState.description && eventFormState.image_url && eventFormState.is_active){
            //if all fields are filled we set errors to be empty
            setErrors("");
            return true
        }else{
            //if all fields are not filled let create the array of empty fields.
            let arrOfEmptyFields = [];
            //let create the array from formState and loop through its key value pairs
            for(const[key,value] of Object.entries(eventFormState)){
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
        //let use the formData to send the request
        const formData = new FormData();
        formData.append('heading', eventFormState.heading);
        formData.append('description', eventFormState.description);
        formData.append('is_active', eventFormState.is_active);
        formData.append('image_url', eventFormState.image_url);
        //let send data to the database
        try {
            const response = await fetch('http://localhost:5000/api/events/events', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const message = "The event is created successfully."
                notify(message);
                closeModel();
                
            }else{
                throw new Error('Failed to save data');
            }  
        } catch (error) {
            console.error("Error saving data:", error);
            // Handle the error appropriately (e.g., show an error message)
        }
    }
 

    return(
        <div className='event-model-container' onClick={(e)=>{
            if(e.target.className==='event-model-container'){
                closeModel()
            }
        }}>
        <div className='event-model'>
        <div className='close'><CloseIcon className='closeIcon' onClick= {closeModel} /></div>
            <form>
                <h2>{modelName}</h2>
                <div className='event-form-group'>
                    <label htmlFor='heading'>Event Title</label>
                    <input name='heading' type="text" value={eventFormState.heading} onChange={handleChange}/>
                </div>
                <div className='event-form-group'>
                    <label htmlFor='description'>Event Description</label>
                    <textarea name='description' type="text" value={eventFormState.description} onChange={handleChange}/>
                </div>
                <div className='event-form-group'>
                    <label htmlFor='image_url'>Upload the image</label>
                    <input name='image_url' type='file' onChange={handleChange}/>
                </div>
                <div className='event-form-group'>
                    <label htmlFor='is_active'>Event Status</label>
                    <select name='is_active' type='text' value={eventFormState.is_active} onChange={handleChange}>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>
              
                {errors && <div className='error'>{`Please include: ${errors}`}</div>}
                <button onClick={handleSubmit} className="event_btn" type='submit'>Save</button>   
            </form>
        </div>
       
    </div>
    )
}
export default CreateEventModel;