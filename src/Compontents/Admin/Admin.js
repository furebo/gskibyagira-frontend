import './admin.css'
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

function Admin(){
   const navigate = useNavigate()
   const buttonRef1 = useRef(null)
   const buttonRef2 = useRef(null)
   const buttonRef3 = useRef(null)
   const buttonRef4lfk = useRef(null)
   const buttonRef4mcb = useRef(null)
   const buttonRef5lfk = useRef(null)
   const buttonRef5mcb = useRef(null)
   const buttonRef6mcb = useRef(null)
   const buttonRef6lfk = useRef(null)
   
   let isHidden = true;
   let isHidden2 = true;
   let isHidden3 = true;
   let isHidden4lfk = true;
   let isHidden4mcb = true;
   let isHidden5lfk = true;
   let isHidden5mcb = true;
   let isHidden6lfk = true;
   let isHidden6mcb = true;

   const[booklevel,setBooklevel]= useState('');
   

//showbooks for senior 1
   const showBooks1 = () => {  
      if(isHidden){
         buttonRef1.current.classList.add('shown1');
         isHidden=false;
      }else{
         buttonRef1.current.classList.remove('shown1');
         isHidden=true; 
         
      } 
   }
//showbooks for senior 2
const showBooks2 = () => {  
   if(isHidden2){
      buttonRef2.current.classList.add('shown1');
      isHidden2=false;
   }else{
      buttonRef2.current.classList.remove('shown1');
      isHidden2=true; 
      
   } 
}
//showbooks for senior 3
const showBooks3 = () => {  
   if(isHidden3){
      buttonRef3.current.classList.add('shown1');
      isHidden3=false;
   }else{
      buttonRef3.current.classList.remove('shown1');
      isHidden3=true; 
      
   } 
}
//showbooks for senior 4lfk
const showBooks4lfk = () => {  
   if(isHidden4lfk){
      buttonRef4lfk.current.classList.add('shown1');
      isHidden4lfk=false;
   }else{
      buttonRef4lfk.current.classList.remove('shown1');
      isHidden4lfk=true; 
      
   } 
}
//showbooks for senior 4mcb
const showBooks4mcb = () => {  
   if(isHidden4mcb){
      buttonRef4mcb.current.classList.add('shown1');
      isHidden4mcb=false;
   }else{
      buttonRef4mcb.current.classList.remove('shown1');
      isHidden4mcb=true; 
      
   } 
}
//showbooks for senior 5lfk
const showBooks5lfk = () => {  
   if(isHidden5lfk){
      buttonRef5lfk.current.classList.add('shown1');
      isHidden5lfk=false;
   }else{
      buttonRef5lfk.current.classList.remove('shown1');
      isHidden5lfk=true; 
      
   } 
}
//showbooks for senior 5mcb
const showBooks5mcb = () => {  
   if(isHidden5mcb){
      buttonRef5mcb.current.classList.add('shown1');
      isHidden5mcb=false;
   }else{
      buttonRef5mcb.current.classList.remove('shown1');
      isHidden5mcb=true; 
      
   } 
}
//showbooks for senior 6lfk
const showBooks6lfk = () => {  
   if(isHidden6lfk){
      buttonRef6lfk.current.classList.add('shown1');
      isHidden6lfk=false;
   }else{
      buttonRef6lfk.current.classList.remove('shown1');
      isHidden6lfk=true; 
      
   } 
}
//showbooks for senior 6mcb
const showBooks6mcb = () => {  
   if(isHidden6mcb){
      buttonRef6mcb.current.classList.add('shown1');
      isHidden6mcb=false;
   }else{
      buttonRef6mcb.current.classList.remove('shown1');
      isHidden6mcb=true; 
      
   } 
}
const onblured = () => {
   buttonRef1.current.style.display = 'none';
}

    return(
            <div className='container'>
            <div>
                <Header className="navbar"/>
             </div>
               <div className='left-panel'>
                  <div>
                    <h3 className='storedBooks'>Stored Books Management</h3>
                     <h4 className='storedBooks'>Select the level</h4>
                  </div>
                  <div className='btnContainer'>
                     <h3 className='classlink1' onClick={showBooks1} onBlur={onblured}>Senior One Class</h3>
                    <button className='bk-button'>
                         <div ref={buttonRef1} className='divLink' >
                              <a><h3    className='classlink' onClick={() => navigate('/seniorone')}>Borrow Book</h3></a>
                              <a><h3    className='classlink'>Submit Book</h3></a>
                         </div>
                     </button>
                     <h3 className='classlink1' onClick={showBooks2}>Senior Two Class</h3>
                    <button  className='bk-button'>
                         <div ref={buttonRef2} className='divLink' >
                              <a><h3 ref={buttonRef2}   className='classlink' onClick={() => navigate('/seniorone')}>Book Borrowing</h3></a>
                              <a><h3 ref={buttonRef2}   className='classlink'>Book Submission</h3></a>
                         </div>
                    </button>
                    <h3 className='classlink1' onClick={showBooks3}>Senior Three Class</h3>
                    <button  className='bk-button'>
                         <div ref={buttonRef3} className='divLink' >
                              <a><h3 ref={buttonRef3}   className='classlink' onClick={() => navigate('/seniorone')}>Book Borrowing</h3></a>
                              <a><h3 ref={buttonRef3}   className='classlink'>Book Submission</h3></a>
                         </div>
                    </button>
                    <h3 className='classlink1' onClick={showBooks4lfk}>Senior Four LFK Class</h3>
                    <button  className='bk-button'>
                           <div ref={buttonRef4lfk} className='divLink' >
                               <a><h3 ref={buttonRef4lfk}   className='classlink' onClick={() => navigate('/seniorone')}>Book Borrowing</h3></a>
                               <a><h3 ref={buttonRef4lfk}   className='classlink'>Book Submission</h3></a>
                            </div>
                    </button>
                    <h3 className='classlink1' onClick={showBooks4mcb}>Senior Four MCB Class</h3>
                    <button  className='bk-button'>
                         <div ref={buttonRef4mcb} className='divLink' >
                              <a><h3 ref={buttonRef4mcb}   className='classlink' onClick={() => navigate('/seniorone')}>Book Borrowing</h3></a>
                              <a><h3 ref={buttonRef4mcb}   className='classlink'>Book Submission</h3></a>
                         </div>
                    </button>
                    <h3 className='classlink1' onClick={showBooks5lfk}>Senior Five LFK </h3>
                    <button  className='bk-button'>
                         <div ref={buttonRef5lfk} className='divLink' >
                              <a><h3 ref={buttonRef5lfk}   className='classlink' onClick={() => navigate('/seniorone')}>Book Borrowing</h3></a>
                              <a><h3 ref={buttonRef5lfk}   className='classlink'>Book Submission</h3></a>
                         </div>
                    </button>
                    <h3 className='classlink1' onClick={showBooks5mcb}>Senior Five MCB</h3>
                    <button  className='bk-button'>
                         <div ref={buttonRef5mcb} className='divLink' >
                              <a><h3 ref={buttonRef5mcb}   className='classlink' onClick={() => navigate('/seniorone')}>Book Borrowing</h3></a>
                              <a><h3 ref={buttonRef5mcb}   className='classlink'>Book Submission</h3></a>
                         </div>
                    </button>
                    <h3 className='classlink1' onClick={showBooks6lfk}>Senior Six LFK</h3>
                    <button  className='bk-button'>
                         <div ref={buttonRef6lfk} className='divLink' >
                              <a><h3 ref={buttonRef6lfk}   className='classlink' onClick={() => navigate('/seniorone')}>Book Borrowing</h3></a>
                              <a><h3 ref={buttonRef6lfk}   className='classlink'>Book Submission</h3></a>
                         </div>
                    </button>
                    <h3 className='classlink1' onClick={showBooks6mcb}>Senior Six MCB</h3>
                    <button  className='bk-button'>
                         <div ref={buttonRef6mcb} className='divLink' >
                              <a><h3 ref={buttonRef6mcb}   className='classlink' onClick={() => navigate('/seniorone')}>Book Borrowing</h3></a>
                              <a><h3 ref={buttonRef6mcb}   className='classlink'>Book Submission</h3></a>
                         </div>
                    </button>
                  </div>

               </div>
    
               <div className='right-panel'>
                <h3 className='bookInfo'>Enter Book Information in Form Bellow</h3>
                  <input type='date' className='input' placeholder='Enter Year'/>
                  <input type='text' className='input' placeholder='Enter Book Type'/>
                  <input type='text' className='input' placeholder='Enter Book Author'/>
                  <input type='text' value={booklevel} onChange={(e)=>setBooklevel(e.target.value)} className='input' placeholder='Enter Book Level'/>
                  <button type='submit' className='subBtn'>Save</button>
               </div>
            </div>      
    )
}
export default Admin

