import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteItemModel from '../../Compontents/DeleteModel';
import ModelUpdateBook from '../../Compontents/modelUpdateBorrowedBook';
import './index.css';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { Space } from 'antd';
import { notify } from '../../Helpers/notify';
import { ToastContainer } from 'react-toastify';
function Table() {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelBookDeletionOpen, setModelBookDeletionOpen] = useState(false);
  const [studentNameState, setStudentNameState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchState, setSearchState] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [bookToEditIndex, setBookToEditIndex] = useState(null);
  const [bookToEditId, setBookToEditId] = useState("");
  const [ModelUpdateBookOpen, setModelUpdateBookOpen] = useState(false)
  //State to handle the id of a clicked item fro FaTrash
  const[itemToBeDeletedId, setItemToBeDeletedId] = useState(0);
  
  const itemsPerPage = 8;

  async function getBorrowedBooks() {
    const response = await fetch('http://localhost:5000/api/books/borrowbook', {
      method: 'GET',
    });
    const json = await response.json(); // Extract the JSON data
    setResponseData(json.data); // Set the actual data
  }

  useEffect(() => {
    getBorrowedBooks();
  }, []);

  let filteredData = responseData.filter((row) =>
    row.Student_Name.toLowerCase().includes(searchState.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  function handleFilter(e) {
    setSearchState(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  }

  const handleBookEdition = (item,index) => {
    setBookToEditIndex(index);
    setBookToEditId(item.id)
    setModelUpdateBookOpen(true);
  };
  
  const handleBookDeletion = (item, index) => {
    setModelBookDeletionOpen(true);
    setStudentNameState(item.Student_Name);
    setItemToBeDeletedId(item.id);
    
  };
  async function bookToSubmit(itemToBeDeletedId){
    const response = await fetch(`http://localhost:5000/api/books/borrowbook/${itemToBeDeletedId}`, {
      method: 'DELETE',
    });
    if(response.ok){
      const message = "The book is returned back successfully by " + studentNameState;
      const Updatedresponse = await fetch('http://localhost:5000/api/books/borrowbook', {
        method: 'GET',
      });
      notify(message)
           // Update the state to remove the deleted item
           const json = await Updatedresponse.json(); // Extract the JSON data
           setResponseData(json.data); // Set the actual data
    
      setModelBookDeletionOpen(false);
      
   
    }
  }
//function to update the state of response when the model is closed
  const bookEditedSubmission = async () =>{
    let updatedResponse = await fetch('http://localhost:5000/api/books/borrowbook',{
             method:'GET'
           })
           let json = await updatedResponse.json();
           setResponseData(json.data);
          }
  
  return (
    <>
      <div className='searchbar'>
        <input type='text' value={searchState} onChange={handleFilter} />
        <h3>Search</h3>
      </div>
      <div className='container mt-5 table_container'>
        <Space direction='vertical' className='Space'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Book Type</th>
                <th>Book Number</th>
                <th>Book Level</th>
                <th>Stud Name</th>
                <th>Class</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.Id}>
                  <td>{item.Book_Type}</td>
                  <td>{item.Book_Number}</td>
                  <td>{item.Book_Level}</td>
                  <td>{item.Student_Name}</td>
                  <td>{item.Student_Class}</td>
                  <td>{item.Borrowing_Date}</td>
                  <td>
                    <span className='books_actions'>
                      <FaTrash
                        className='delete-btn'
                        onClick={() => handleBookDeletion(item, index)}
                      />
                      <FaPencilAlt
                        className='edit-btn'
                        onClick={() => handleBookEdition(item,index)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <ul className='pagination'>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                &lt; Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                  onClick={() => handleClick(index + 1)}
                >
                  <button className='page-link'>{index + 1}</button>
                </li>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next &gt;
              </button>
            </ul>
          </div>
        </Space>
      </div>
      {ModelUpdateBookOpen && (
        <ModelUpdateBook
          className='bookEditionModel'
          closeModel={() => {
            setModelUpdateBookOpen(false);
            setBookToEditIndex(null);
            bookEditedSubmission();
          }}
          itemId={bookToEditId}
          defaultValue={
            bookToEditIndex !== null && responseData[bookToEditIndex]
          }
        />
      )}
      {modelBookDeletionOpen && (
        <DeleteItemModel
          closeModel={() => setModelBookDeletionOpen(false)}
          studentName={studentNameState}
          itemId={itemToBeDeletedId}
          onDelete={bookToSubmit}
        />
      )}
      
      <ToastContainer position='top-center'/>
    </>
  );
}

export default Table;
