import React, {useState,useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaTrash, FaPencilAlt} from 'react-icons/fa'
import AddIcon from '@mui/icons-material/Add';
import { Space} from 'antd';
import CreateStaffModel from '../../Compontents/ModelStaff';
import UpdateStaffModel from '../../Compontents/ModelUpdateStaff';
import StaffDeleteModel from '../../Compontents/DeleteModel';
import { notify } from '../../Helpers/notify';


function Table() {
  const[allStaffs,setAllStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchState, setSearchState] = useState("");
  
  const itemsPerPage = 7;

  //the function to fetch all events and update the allEvents state
const getAllStaff = async () =>{
    let allStaffResponse = await fetch('https://gskibyagira-backend.onrender.com/api/staffs/staffs',{
             method:'GET'
           })
           let json = await allStaffResponse.json();
           setAllStaffs(json.data);
          }
  
          useEffect(() => {
            getAllStaff();
          }, []);

 let filteredData = allStaffs.filter((row)=>{
       return row.lastname.toLowerCase().includes(searchState.toLowerCase())
        
     })

// Calculate the number of pages
const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// Get the data for the current page
const currentData = filteredData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const handleClick = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  function handleFilter(e){
    setSearchState(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
}

//the state to manage the opening of the CreateStaffModel state
const[staffModelOpen, setStaffModelOpen] = useState(false);
const handleStaffCreation = () =>{
  setStaffModelOpen(true)
}

// //the state to manage the index of the staff to be edited.
 const[staffToEditIndex,setStaffToEditIndex] = useState(null)
const handleStaffEdition = (item,index)=>{
    setStaffToEditIndex(index);
    setUpdateStaffModelOpen(true);
    setStaffToEditId(item.id)
}
// //the state to manage event deletion
 const[modelStaffDeletionOpen,setModelStaffDeletionOpen] = useState(false);
 const[staffNameState, setStaffNameState] = useState("");
 const[staffToDeleteId, setStaffToDeleteId] = useState(0);
// const[updatedEventsStateAfterDeletion,setUpdatedEventsStateAfterDeletion] = useState([]);
const handleStaffDeletion = (item,index)=>{
  setStaffNameState("this staff")
  setModelStaffDeletionOpen(true);
  setStaffToDeleteId(item.id);
}
//the state to manage the event edition
const[updateStaffModelOpen,setUpdateStaffModelOpen] = useState(false);
const[staffToEditId,setStaffToEditId] = useState("");

//the function to delete a staff
async function StaffToBeDeleted(staffToDeleteId){
  const response = await fetch('https://gskibyagira-backend.onrender.com/api/staffs/staffs/'+ staffToDeleteId, {
    method: 'DELETE',
  });
  if(response.ok){
    const message = "The staff is deleted successfully"
    notify(message)
    const Updatedresponse = await fetch('https://gskibyagira-backend.onrender.com/api/staffs/staffs', {
      method: 'GET',
    });
       // Update the state to remove the deleted item
     const json = await Updatedresponse.json(); // Extract the JSON data
     setAllStaffs(json.data); // Set the actual data
    setModelStaffDeletionOpen(false);
  }
}

//function to update the state of response when the model is closed
const staffEditedSubmission = async () =>{
    let updatedResponse = await fetch('https://gskibyagira-backend.onrender.com/api/staffs/staffs',{
             method:'GET'
           })
           let json = await updatedResponse.json();
           setAllStaffs(json.data);
        }

  return (
    <>
    <div className='addevent'>
      <div className='eventcreation' onClick={()=>handleStaffCreation()}>
      <AddIcon className='addicon'/>
      Add Staff
      </div>
    </div>
    <div className="container mt-5 table_container">
    <Space direction="vertical" className='Space'>
      <table className="tablest table-striped table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Description</th>
            <th>Image_url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item,index) => (
            <tr key={item.Id}>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.role}</td>
              <td>{item.description}</td>
              <td className='imageurl'>{item.image_url}</td>
              <td >
                   <span className='books_actions'>
                        <FaTrash className='delete-btn' onClick={()=>handleStaffDeletion(item,index)} />
                        <FaPencilAlt className='edit-btn' onClick={()=>handleStaffEdition(item,index)}  />
                    </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt; Prev
        </button>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'isactive' : ''}`}
              onClick={() => handleClick(index + 1)}
            >
              <button className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
        </ul>
      </div>
      </Space>
    </div>
    <ToastContainer position='top-center'/>
    { staffModelOpen && <CreateStaffModel closeModel={()=>{
      setStaffModelOpen(false);
      setStaffToEditIndex(null);
    }} defaultValue={staffToEditIndex !== null && allStaffs[staffToEditIndex]} modelName={staffToEditIndex !== null ? "Update Staff" :"Create Staff"}/>}
   
    {/**the model to update staff */}
    {updateStaffModelOpen && <UpdateStaffModel staffId={staffToEditId} defaultValue={staffToEditIndex !== null && allStaffs[staffToEditIndex]} 
    closeModel={()=>{
        setUpdateStaffModelOpen(false);
        setStaffToEditIndex(null);
        staffEditedSubmission();
      }}
    />}

    {/**the model to delete staff */}
    {modelStaffDeletionOpen && <StaffDeleteModel itemId={staffToDeleteId} onDelete={StaffToBeDeleted} closeModel={()=>setModelStaffDeletionOpen(false)} studentName={staffNameState} />}
    
    </>
  );
  
}


export default Table;

