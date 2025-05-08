import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteItemModel from '../../Compontents/DeleteModel';
import ModelUpdateBook from '../../Compontents/modelUpdateBorrowedBook';
import BookSubmitItemModel from '../../Compontents/BookSubmitModel';
import './index.css';
import { FaTrash, FaPencilAlt, FaSearch} from 'react-icons/fa';
import { Space } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { Checkbox } from '@mui/material'; // Import Checkbox from MUI

function Table() {
  const [modelBookDeletionOpen, setModelBookDeletionOpen] = useState(false);
  const [studentNameState, setStudentNameState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchState, setSearchState] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [bookToEditData, setBookToEditData] = useState(null);
  const [bookToEditId, setBookToEditId] = useState("");
  const [itemBookCheckingId, setItemBookCheckingId] = useState('');
  const [ModelUpdateBookOpen, setModelUpdateBookOpen] = useState(false);
  const [itemToBeDeletedId, setItemToBeDeletedId] = useState(0);
  const [selectedYear, setSelectedYear] = useState('2024 - 2025'); // state to track selected academic year
  const [selectedBooks, setSelectedBooks] = useState({});// state to control checkbox checked status
  const [loading, setLoading] = useState(true); // state to control the loading od fetched data

  const itemsPerPage = 10;

  async function getBorrowedBooks() {
    setLoading(true); // Start loading
    try {
      const response = await fetch('https://gskibyagira-backend.onrender.com/api/books/borrowbook', {
        method: 'GET',
      });
      const json = await response.json();
      setResponseData(json.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // End loading
    }
  }
  

  useEffect(() => {
    getBorrowedBooks();
  }, []);

  // Function to filter data based on selected academic year
  function filterByAcademicYear(data) {
    const [startYear, endYear] = selectedYear.split(' - ').map(year => parseInt(year));
  
    const academicYearStart = new Date(`${startYear}-09-01`); // September 1st, start year
    const academicYearEnd = new Date(`${endYear}-07-31T23:59:59`); // July 31st, end year (end of day)
  
    return data.filter(item => {
      const borrowDate = new Date(item.Borrowing_Date);
      return borrowDate >= academicYearStart && borrowDate <= academicYearEnd;
    });
  }
  

  let filteredData = responseData.filter((row) =>
    row.Student_Name.toLowerCase().includes(searchState.toLowerCase())
  );

  filteredData = filterByAcademicYear(filteredData);

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
    setCurrentPage(1);
  }

  const handleAcademicYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };

// the state to track current checkbox status
  const [isCurrentlyChecked, setIsCurrentlyChecked] = useState(false); 
//Function to handle checkbox cahnge
const handleCheckboxChange = (bookId, studentName) => {
  setModelBookSubmitionOpen(true);
  setStudentNameState(studentName);
  setItemBookCheckingId(bookId);
  setIsCurrentlyChecked(!!selectedBooks[bookId]); // save current status
};
  
  const handleBookEdition = (item) => {
    setBookToEditData(item);
    setBookToEditId(item.id);
    setModelUpdateBookOpen(true);
  };
//function to handle book deletion
  const handleBookDeletion = (item, index) => {
    setModelBookDeletionOpen(true);
    setStudentNameState(item.Student_Name);
    setItemToBeDeletedId(item.id);
  };
 //state to handle book submition model(checked) 
const [modelBookSubmitionOpen, setModelBookSubmitionOpen] = useState(false);
//function to handle checkbox confirmed.
const handleCheckboxConfirmed = async (bookId, wasChecked) => {
  const newCheckedStatus = !wasChecked;

  // 1. Update checkbox state
  setSelectedBooks(prev => ({
    ...prev,
    [bookId]: newCheckedStatus
  }));

  // 2. Send PUT request to backend to update the status
  try {
    const response = await fetch(`https://gskibyagira-backend.onrender.com/api/books/borrowbook/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Status: newCheckedStatus ? 'Submitted' : 'Not Submitted',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update book status');
    }

    // 3. Optional: Show toast and refresh data
    toast.success(
      newCheckedStatus 
        ? `Book marked as submitted by ${studentNameState}` 
        : `Book submission cancelled for ${studentNameState}`,
      { style: { backgroundColor: newCheckedStatus ? "green" : "yellow", color: "black" } }
    );

    // Refresh book data
    getBorrowedBooks();

  } catch (error) {
    toast.error('Failed to update status');
    console.error(error);
  }

  setModelBookSubmitionOpen(false);
};



  async function bookToSubmit(itemToBeDeletedId) {
    const response = await fetch(`https://gskibyagira-backend.onrender.com/api/books/borrowbook/${itemToBeDeletedId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const message = "The book is returned back successfully by " + studentNameState;
      const Updatedresponse = await fetch('https://gskibyagira-backend.onrender.com/api/books/borrowbook', {
        method: 'GET',
      });
      toast.success(message, { style: { backgroundColor: "green", color: "white" } });
      const json = await Updatedresponse.json();
      setResponseData(json.data);
      setModelBookDeletionOpen(false);
    }
  }

  const bookEditedSubmission = async () => {
    let updatedResponse = await fetch('https://gskibyagira-backend.onrender.com/api/books/borrowbook', {
      method: 'GET',
    });
    let json = await updatedResponse.json();
    setResponseData(json.data);
  }

  return (
    <div className='borrowedbook_container'>
      <div className='searchbar'>
        <div className='search_accademic_year'>
          <h3>Books Borrowed</h3>
          <div className='search-container'>
            <FaSearch className='search-icon' />
            <input 
              type='text' 
              value={searchState} 
              onChange={handleFilter} 
              placeholder="Search by name..." 
            />
          </div>
          <div className='select-accademic-year'>
            <h3>Academic Year</h3>
            <select value={selectedYear} onChange={handleAcademicYearChange}>
              <option>2024 - 2025</option>
              <option>2025 - 2026</option>
              <option>2026 - 2027</option>
              <option>2027 - 2028</option>
            </select>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className='container mt-2 table_container' style={{border:'1px solid blue'}}>
        <Space direction='vertical' className='Space' >
          <table className='table table-striped table-bordered table-sm' >
            <thead>
              <tr>
                <th>Submitted</th>
                <th>Book Type</th>
                <th>Book Number</th>
                <th>Book Level</th>
                <th>Borrower Name</th>
                <th>Class</th>
                <th>Borrow Date</th>
                <th>submission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((item, index) => (
                <tr key={item.Id}>              
                  <td>
                  <Checkbox style={{padding:'0.3rem'}}
                             checked={
                                       selectedBooks.hasOwnProperty(item.id) ? selectedBooks[item.id] // if we already updated it
                                       : item.Status === 'Submitted' // otherwise, use backend value
                                     }
                              onChange={() => handleCheckboxChange(item.id, item.Student_Name)}
                  />
                  </td>
                  <td>{item.Book_Type}</td>
                  <td>{item.Book_Number}</td>
                  <td>{item.Book_Level}</td>
                  <td>{item.Student_Name}</td>
                  <td>{item.Student_Class}</td>
                  <td>{item.Borrowing_Date}</td>
                  <td style={{ color: new Date(item.Return_Date) < new Date() && item.Status !== "Submitted" ? 'red' : 'black' }}>{item.Return_Date}</td>

                  <td>{item.Status || 'Not Submitted'}</td>
                  <td>
                    <span className='books_actions'>
                      <FaTrash className='delete-btn' onClick={() => handleBookDeletion(item, index)} />
                      <FaPencilAlt className='edit-btn' onClick={() => handleBookEdition(item, index)} />
                    </span>
                  </td>
                </tr>
              )): ''}
            </tbody>
          </table>
          <div className='show-data'>
          {loading ? (
                 <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">Loading...</span>
                 </div>
             ) : currentData.length === 0 ? (<div>No data found</div>) : null}
           </div>
 
          <div>
            <ul className={currentData.length > 0 ? 'pagination' : 'no-pagination'} >
              <button style={{padding:'3px 3px'}} onClick={handlePreviousPage} disabled={currentPage === 1}>
                &lt; Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'isactive' : ''}`} onClick={() => handleClick(index + 1)}>
                  <button className='page-link'>{index + 1}</button>
                </li>
              ))}
              <button style={{padding:'3px 3px'}} onClick={handleNextPage} disabled={currentPage === totalPages}>
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
            setBookToEditData(null);
            bookEditedSubmission();
          }}
          itemId={bookToEditId}
          defaultValue={bookToEditData}
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
      {modelBookSubmitionOpen && (
         <BookSubmitItemModel 
              closeModel={() => setModelBookSubmitionOpen(false)}
              studentName={studentNameState}
              itemId={itemBookCheckingId}
              isChecked={isCurrentlyChecked}
              onChecked={handleCheckboxConfirmed}
        />
     )}


      <ToastContainer position='top-center'/>
    </div>
  );
}

export default Table;
