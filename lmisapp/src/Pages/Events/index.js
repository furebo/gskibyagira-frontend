import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, {useState,useEffect} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaTrash, FaPencilAlt} from 'react-icons/fa'
import AddIcon from '@mui/icons-material/Add';
import { Space } from 'antd';
import CreateEventModel from '../../Compontents/ModelEvents';
import UpdateEventModel from '../../Compontents/modelUpdateEvent';
import EventDeleteModel from '../../Compontents/DeleteModel';

function Table() {
  const[allEvents,setAllEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchState, setSearchState] = useState("");
  const itemsPerPage = 7;

 let filteredData = allEvents.filter((row)=>{
       return row.heading.toLowerCase().includes(searchState.toLowerCase())
        
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

//the function to fetch all events and update the allEvents state
const getAllEvents = async () =>{
  let allEventsResponse = await fetch('https://gskibyagira-backend.onrender.com/api/events/events',{
           method:'GET'
         })
         let json = await allEventsResponse.json();
         setAllEvents(json.data);
        }

        useEffect(() => {
          getAllEvents();
        }, []);
//the state to manage the opening of the CreateEventModel state
const[eventModelOpen, setEventModelOpen] = useState(false);
const handleEventCreation = () =>{
  setEventModelOpen(true)
}

//the state to manage the index of the event to be edited.
const[eventToEditIndex,setEventToEditIndex] = useState(null)
const handleEventEdition = (item,index)=>{
    setEventToEditIndex(index);
    setUpdateEventModelOpen(true);
    setEventToEditId(item.id)
}
//the state to manage event deletion
const[modelEventDeletionOpen,setModelEventDeletionOpen] = useState(false);
const[eventNameState, setEventNameState] = useState("");
const[eventToDeleteId, setEventToDeleteId] = useState(0);
//const[updatedEventsStateAfterDeletion,setUpdatedEventsStateAfterDeletion] = useState([]);
const handleEventDeletion = (item,index)=>{
  setEventNameState("this event")
  setModelEventDeletionOpen(true);
  setEventToDeleteId(item.id);
}
//the state to manage the event edition
const[updateEventModelOpen,setUpdateEventModelOpen] = useState(false);
const[eventToEditId,setEventToEditId] = useState("");

//the function to delete an event
async function EventToBeDeleted(eventToDeleteId){
  const response = await fetch('https://gskibyagira-backend.onrender.com/api/events/events/'+ eventToDeleteId, {
    method: 'DELETE',
  });
  if(response.ok){
    const Updatedresponse = await fetch('https://gskibyagira-backend.onrender.com/api/events/events', {
      method: 'GET',
    });
     const message = "The event is deleted successfully"
     toast.success(message, {
      style: { backgroundColor: "green", color: "white" },
    });
     // Update the state to remove the deleted item
     const json = await Updatedresponse.json(); // Extract the JSON data
     setAllEvents(json.data); // Set the actual data
    setModelEventDeletionOpen(false);
  }
}

//function to update the state of response when the model is closed
const eventEditedSubmission = async () =>{
  let updatedResponse = await fetch('https://gskibyagira-backend.onrender.com/api/events/events',{
           method:'GET'
         })
         let json = await updatedResponse.json();
         setAllEvents(json.data);
        }

  return (
    <>
    <div className='addevent'>
      <div className='eventcreation' onClick={handleEventCreation}>
      <AddIcon className='addicon'/>
      Add Event
      </div>
    </div>
    <div className="container mt-5 table_container">
    <Space direction="vertical" className='Space'>
      <table className="tablee table-striped table-bordered">
        <thead>
          <tr>
            <th>Event Title</th>
            <th>Event Description</th>
            <th>Image Url</th>
            <th>Is Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item,index) => (
            <tr key={item.Id}>
              <td>{item.heading}</td>
              <td>{item.description}</td>
              <td className='imageurl'>{item.image_url}</td>
              <td>{item.is_active}</td>
              <td >
                   <span className='books_actions'>
                        <FaTrash className='delete-btn' onClick={()=>handleEventDeletion(item,index)}/>
                        <FaPencilAlt className='edit-btn' onClick={()=>handleEventEdition(item,index)} />
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
    {eventModelOpen && <CreateEventModel closeModel={()=>{
      setEventModelOpen(false);
      setEventToEditIndex(null);
    }
      } defaultValue={eventToEditIndex !== null && allEvents[eventToEditIndex]} modelName={eventToEditIndex !== null ? "Update Event" :"Create Event"}/>}
      {updateEventModelOpen && <UpdateEventModel eventId={eventToEditId} defaultValue={eventToEditIndex !== null && allEvents[eventToEditIndex]} closeModel={()=>{
        setUpdateEventModelOpen(false);
        eventEditedSubmission();
        }} />}
      {modelEventDeletionOpen && <EventDeleteModel itemId={eventToDeleteId} onDelete={EventToBeDeleted} closeModel={()=>setModelEventDeletionOpen(false)} studentName={eventNameState} />}
    </>
  );
  
}


export default Table;
