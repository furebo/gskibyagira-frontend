import React from 'react'
import {FaTrash, FaPencilAlt} from 'react-icons/fa';
import Navbar from '../Navbar/index';
import Model from '../modelbooks/Model';
import './Books.css';
import {useEffect, useState} from 'react';
import { Checkbox } from '@mui/material';
import {TablePagination} from "@mui/material";
function Books(){

    const [modelOpen, setModelOpen] = useState(false);
    const [editRow,setEditRow] = useState(null);
    const [searchState, setSearchState] = useState("");
   // const [page,setPage] = useState(1);
    const [limit,setLimit] = useState(8);
    const [paginatedBooks, setPaginatedBooks] = useState([
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
    ])
    
    const handleEdit = (index) => {
        setEditRow(index);
        setModelOpen(true)
     }
    
     function handleFilter(e){
        setSearchState(() => e.target.value)
        let newBooks = books.filter((row)=>{
            return row.Book_Type.toLowerCase().includes(e.target.value.toLowerCase())
            
        })
        setPaginatedBooks(newBooks);    
        //console.log(e.target.value)
    }

    
    function handleDeleteBook(targetIndex){
        //here we will delete from the database using index passed to the this function 
        setFilteredRows(filteredRows.filter((_, index)=> index !== targetIndex))
        //The undersco here means we are ignoring the actual data and teke only the index.
    }
    
    // function getStudents(){
    //    let allStudentsArr=[];
    //    for(let i = (page-1)*limit; i < (page*limit); i++){
    //     allStudentsArr.push(books[i]);
    //    }
    //    //console.log(allStudentsArr)
    //    setPaginatedBooks(allStudentsArr); 
    //    setPage(page+1)    
    // }

    function gonext(){
       // getStudents()
       // setPage(page+1)
         
         
    }
    function goprevious(){
        setPage(page -1 );
        //getStudents();
    }

    const [books,setBooks] = useState([
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:2,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:3,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:4,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:5,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:6,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:7,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:8,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:9,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:10,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:11,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:12,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:13,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:14,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:15,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:16,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:17,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:18,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:19,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:20,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:21,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:22,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:23,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:24,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:25,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:26,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:27,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:28,
            Book_Type:'History',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:29,
            Book_Type:'History',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:30,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:31,
            Book_Type:'History',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:32,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:33,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        {
            Id:34,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Book_status:'Borrowed',
            Book_author:'REB',
            delivery_date:'1/6/2023'
        },
        
    ])
    const [filteredRows, setFilteredRows] = useState(books);

    function handleSubmit(newRow){
        editRow === null ? setBooks([...books,newRow]) : setBooks(books.map((currentRow,index)=>{
         if(index !== editRow )
             return currentRow
             return newRow    
        }))  
     }
     const [page, setPage] = React.useState(0);
     const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
     
    return (
        <>
         <Navbar />
         <div className='welcomee'>
           <marquee><h2>Welcome To GS KIBYAGIRA-BURUHUKIRO Library Management Information System</h2></marquee>
        </div>
        <div className='books_table_wrapper'>
            
        <div className='mainContainer'>
        <div className='accademic'><div className='classlevel'><h3>Book Level S1</h3></div><h3>Accademic Yeary 2023 - 2024</h3></div>
            <div className='searchbar'>
                <input type='text' value={searchState} onChange={handleFilter} />
                <h3>Search</h3>
            </div>
            <table className='books_table'>
                <thead>
                    <tr>
                    <th>Id</th>   
                    <th>Book Type</th>
                    <th>Book Level</th>
                    <th>Book Number</th>
                    <th>Book Status</th>
                    <th>Book Author</th>
                    <th>Delivery Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book,index)=>{
                        return(
                            <tr key={index}>
                                <td>{book.Id}</td>
                                <td>{book.Book_Type}</td>
                                <td>{book.Book_level}</td>
                                <td>{book.Book_Number}</td>
                                <td><Checkbox />{book.Book_status}</td>
                                <td>{book.Book_author}</td>
                                <td className='expand'>{book.delivery_date}</td>
                                <td >
                                    <span className='books_actions'>
                                         <FaTrash className='delete-btn'onClick={() => handleDeleteBook(index)}/>
                                         <FaPencilAlt className='edit-btn' onClick={()=>handleEdit(index)} />
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
  
           <TablePagination className='tablepagination'
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          data-testid="pagination"
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
            </div>
        </div>
        {modelOpen && <Model onSubmit={handleSubmit} closeModel = {()=>setModelOpen(false)} defaultValue={editRow !== null && books[editRow]} />}
        </>
    )
}
export default Books;