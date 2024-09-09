import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { notify } from '../../Helpers/notify';

function CreateStaffModel({closeModel,defaultValue,modelName}){
    const [staffFormState, setStaffFormState] = useState(defaultValue || {
        firstName:'',
        lastName:'',
        role:"",
        description:'',
        image_url:'',        
    });
    
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState("");

    function handleChange(e){
        const { name, value, files } = e.target;
        setStaffFormState({
            ...staffFormState,
            [name]: name === 'image_url' ? files[0] : value
        });
    }

    const validateForm = () => {
        if(staffFormState.firstName && staffFormState.lastName && staffFormState.image_url && staffFormState.role && staffFormState.description){
            setErrors("");
            return true;
        } else {
            let arrOfEmptyFields = [];
            for(const [key, value] of Object.entries(staffFormState)){
                if(!value){
                    arrOfEmptyFields.push(key);
                }
            }
            setErrors(arrOfEmptyFields.join(", "));
            return false;
        }
    };

    async function handleSubmit(e){
        e.preventDefault();
        if(!validateForm()) {
            return;
        }
        
        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append('firstName', staffFormState.firstName);
        formData.append('lastName', staffFormState.lastName);
        formData.append('role', staffFormState.role);
        formData.append('description', staffFormState.description);
        formData.append('image_url', staffFormState.image_url);

        try {
            const response = await fetch('http://localhost:5000/api/staffs/staffs', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const message = "The staff member is created successfully.";
                notify(message);
                closeModel();
            } else {
                throw new Error('Failed to save data');
            }  
        } catch (error) {
            console.error("Error saving data:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    return(
        <div className='event-model-container' onClick={(e)=>{
            if(e.target.className==='event-model-container'){
                closeModel();
            }
        }}>
            <div className='event-model'>
                <div className='close'>
                    <CloseIcon className='closeIcon' onClick={closeModel} />
                </div>
                <form>
                    <h2>{modelName}</h2>
                    <div className='event-form-group'>
                        <label htmlFor='firstName'>First Name</label>
                        <input name='firstName' type="text" value={staffFormState.firstName} onChange={handleChange} />
                    </div>
                    <div className='event-form-group'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input name='lastName' type="text" value={staffFormState.lastName} onChange={handleChange} />
                    </div>
                    <div className='event-form-group'>
                        <label htmlFor='role'>Role</label>
                        <select name='role' type='text' value={staffFormState.role} onChange={handleChange}>
                            <option>Head Teacher</option>
                            <option>DOS</option>
                            <option>DOD</option>
                            <option>LAB Attendant</option>
                            <option>Burser</option>
                            <option>Secretary</option>
                            <option>Librarian</option>
                            <option>Teacher</option>
                            <option>Supporting</option>
                        </select>
                    </div>
                    <div className='event-form-group'>
                        <label htmlFor='description'>Description</label>
                        <input name='description' type="text" value={staffFormState.description} onChange={handleChange} />
                    </div>
                    <div className='event-form-group'>
                        <label htmlFor='image_url'>Upload the image</label>
                        <input name='image_url' type='file' onChange={handleChange} />
                    </div>   
                    {errors && <div className='error'>{`Please include: ${errors}`}</div>}
                    <button onClick={handleSubmit} className="event_btn" type='submit' disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>   
                </form>
            </div>
        </div>
    );
}

export default CreateStaffModel;
