import './index.css'
import {useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Model from '../../Compontents/ModelBookBorrowing/model';
import NestedSelect from '../../Compontents/nestedSelect';
import { notify } from '../../Helpers/notify';

function Admin(){
   const[modelOpen, setModelOpen] = useState(false);
   const[bookFormData,setBookFormData] = useState({
      bookType:'',
      bookLevel:'',
      bookCode:'',
      bookAuthor:'',
      deliveryDate:''
   });
   const handleChange = (e)=>{
      const{name,value} = e.target;
      setBookFormData({
         ...bookFormData,
         [name]:value
      })
   };
   // Handle form submission 
   const handleSubmit = async (e) => {
      e.preventDefault();  // Prevent the default form submission behavior
      
      try {

         const response = await fetch('https://gskibyagira-backend.onrender.com/api/books/books', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookFormData),
         });

         const result = await response.json();

         if (response.ok) {
            const message = 'Book information saved successfully!';
            notify(message);
            // Clear the form after successful submission
            setBookFormData({
               bookType: '',
               bookLevel: '',
               bookCode:'',
               bookAuthor: '',
               deliveryDate: ''
            });
         } else {
            const message =`Error: ${result.message}`;
            notify(message)
         }
      } catch (error) {
         const message = 'Failed to save book information.';
         notify(message)
      }
   };

   return(
            <>
            <div className='container'>
               <NestedSelect />
               <div className='right-panel'>
                <h3 className='bookInfo'>Enter Book Information in Form Bellow</h3>
                  <div>
                  <label>Delivery Date</label>
                  <input type='date' name='deliveryDate' value={bookFormData.deliveryDate} onChange={handleChange} className='date' placeholder='Enter Year'/>
                  </div>
                  <div>
                  <label>Book Type</label>
                  <input type='text' name='bookType' value={bookFormData.bookType} onChange={handleChange} className='input' placeholder='Enter Book Type'/>
                  </div>
                  <div>
                  <label>Book Code</label>
                  <input type='text' name='bookCode' value={bookFormData.bookCode} onChange={handleChange} className='input' placeholder='Enter Book Code'/>
                  </div>
                  <div>
                  <label>Book Author</label>
                  <input type='text' name='bookAuthor' value={bookFormData.bookAuthor} className='input' onChange={handleChange} placeholder='Enter Book Author'/>
                  </div>
                  <div>
                  <label>Book Level</label>
                  <input type='text' name='bookLevel' value={bookFormData.bookLevel} onChange={handleChange} className='input' placeholder='Enter Book Level'/>
                  </div>
                  <button type='submit' onClick={handleSubmit} className='subBtn'>Save</button>
               </div>
            </div> 
            {modelOpen && <Model closeModel = {()=>setModelOpen(false)} />}
            <ToastContainer position="top-center" />
         </>
         )
      }
export default Admin

