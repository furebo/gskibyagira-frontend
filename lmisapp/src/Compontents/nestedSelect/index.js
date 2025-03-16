import React, {useState} from 'react';
import './index.css';
import Model from '../modelbooks/Model';
function NestedSelect() {
    const [modelOpen, setModelOpen] = useState(false);
    const handleEdit = () => {
        setModelOpen(true);
     }
  return (
    <>
    <div className="nested-select-container">
        <button type='sumbit' className='bbb' onClick={()=>handleEdit()}>Borrow Book</button>
    </div> 
      {modelOpen && <Model closeModel = {()=>setModelOpen(false)} />}
    </>
  )

}
    
  


export default NestedSelect;
