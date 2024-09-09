import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaTrash, FaPencilAlt} from 'react-icons/fa'
import './BooksBorrowed.css';
import Model from '../modelbooks/Model';
import {useEffect, useState} from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import Navbar from '../Navbar/index'
function Books(){
    const [modelOpen, setModelOpen] = useState(false);
     //let create a state to edit the row
    const [editRow,setEditRow] = useState(null);
    const [searchState, setSearchState] = useState("");
    //const [page,setPage] = useState(0);
    const [limit,setLimit] = useState(8);
    const [studentIndex, setStudentIndex] = useState("")
    
    const notify = () => toast.success(`The Records of Student ${paginatedStudents[studentIndex].Student_Name} of ${paginatedStudents[studentIndex].Student_Class} Class are Updated successfully.`,
    {
        style: { 
            background: 'green',
            color:'white',
            width:'600px',
            marginRight:50,
            zIndex: '-1'
         }
    })

    function handleSubmit(newRow){
       notify()
       editRow === null ? setRows([...rows,newRow]) : setRows(rows.map((currentRow,index)=>{
        if(index !== editRow )
            return currentRow
            return newRow    
       }))  
    }

    //let create a function to handle the row edition. It will pass the index to the state
    //and also open the model
    const handleEdit = (index) => {
        setEditRow(index);
        setModelOpen(true);
        setStudentIndex(index);
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

     
  
    const [rows,setRows] = useState([
        {
            Id:1,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:2,
            Book_Type:'Mathematics',
            Book_Level:'S1',
            Book_Number:'002/2023',
            Student_Name:'Magayane',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:3,
            Book_Type:'History',
            Book_Level:'S1',
            Book_Number:'001/2024',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:4,
            Book_Type:'Geograph',
            Book_Level:'S1',
            Book_Number:'00003',
            Student_Name:'Barnabe',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:5,
            Book_Type:'French',
            Book_Level:'S1',
            Book_Number:'0002',
            Student_Name:'Abel',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:6,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Brigitte',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:7,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:8,
            Book_Type:'Mathematics',
            Book_Level:'S1',
            Book_Number:'002/2023',
            Student_Name:'Magayane',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:9,
            Book_Type:'History',
            Book_Level:'S1',
            Book_Number:'001/2024',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:10,
            Book_Type:'Geograph',
            Book_Level:'S1',
            Book_Number:'00003',
            Student_Name:'Barnabe',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:11,
            Book_Type:'French',
            Book_Level:'S1',
            Book_Number:'0002',
            Student_Name:'Abel',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:12,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Brigitte',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:13,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Kabalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:14,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Kabarebe',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:15,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Kabashengure',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:16,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:17,
            Book_Type:'Mathematics',
            Book_Level:'S1',
            Book_Number:'002/2023',
            Student_Name:'Magayane',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:18,
            Book_Type:'History',
            Book_Level:'S1',
            Book_Number:'001/2024',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:19,
            Book_Type:'Geograph',
            Book_Level:'S1',
            Book_Number:'00003',
            Student_Name:'Barnabe',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:20,
            Book_Type:'French',
            Book_Level:'S1',
            Book_Number:'0002',
            Student_Name:'Abel',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:21,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Brigitte',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:22,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Kabalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:23,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Kabarebe',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:24,
            Book_Type:'kiswahili',
            Book_Level:'S1',
            Book_Number:'0001',
            Student_Name:'Kabashengure',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:25,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:26,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'ITANGIRI',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:27,
            Book_Type:'Francais',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'MUNGANYIMANA',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:28,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'MUKAKADAGE',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:29,
            Book_Type:'Kiswahili',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'MUKAGASISI',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:30,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:31,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:32,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:33,
            Book_Type:'kinyarwanda',
            Book_Level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
    ])
    const [paginatedStudents, setPaginatedStudents] = useState([
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
            Id:2,
            Book_Type:'Mathematics',
            Book_level:'S1',
            Book_Number:'002/2023',
            Student_Name:'Magayane',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:3,
            Book_Type:'History',
            Book_level:'S1',
            Book_Number:'001/2024',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:4,
            Book_Type:'Geograph',
            Book_level:'S1',
            Book_Number:'00003',
            Student_Name:'Barnabe',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:5,
            Book_Type:'French',
            Book_level:'S1',
            Book_Number:'0002',
            Student_Name:'Abel',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:6,
            Book_Type:'kiswahili',
            Book_level:'S1',
            Book_Number:'0001',
            Student_Name:'Brigitte',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:7,
            Book_Type:'kinyarwanda',
            Book_level:'S1',
            Book_Number:'007',
            Student_Name:'Kalisa',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
        {
            Id:8,
            Book_Type:'Mathematics',
            Book_level:'S1',
            Book_Number:'002/2023',
            Student_Name:'Magayane',
            Student_Class:'S1A',
            Borrowing_Date:'1/2/2024'
        },
    ])

    const [filteredRows, setFilteredRows] = useState(rows);
    
        function handleFilter(e){
            setSearchState(() => e.target.value)
            let newStudents = rows.filter((row)=>{
                return row.Student_Name.toLowerCase().includes(e.target.value.toLowerCase())    
            })
            setPaginatedStudents(newStudents);    
            //console.log(e.target.value)
        }
    

    function handleDeleteBook(targetIndex){
        //here we will delete from the database using index passed to the this function 
        setFilteredRows(filteredRows.filter((_, index)=> index !== targetIndex))
        //The undersco here means we are ignoring the actual data and teke only the index.
    }
    
  
       
    return (
        <>
        <Navbar className="height"/>
        <div className='welcomee'>
           <marquee><h2>Welcome To GS KIBYAGIRA-BURUHUKIRO Library Management Information System</h2></marquee>
        </div>
        <div className='books_table_wrapper'>
            
        <div className='mainContainer'>
        <div className='accademic'><div className='classlevel'><h3>Class S1A</h3></div><h3>Accademic Yeary 2023 - 2024</h3></div>
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
                    <th className='expand'>Student Name</th>
                    <th>Student Class</th>
                    <th>Borrowing Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedStudents.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td>{item.Id}</td>
                                <td>{item.Book_Type}</td>
                                <td>{item.Book_level}</td>
                                <td>{item.Book_Number}</td>
                                <td className='expand'>{item.Student_Name}</td>
                                <td>{item.Student_Class}</td>
                                <td>{item.Borrowing_Date}</td>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          data-testid="pagination"
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
            </div>
  
        </div>
    
        {modelOpen && <Model onSubmit={handleSubmit} closeModel = {()=>setModelOpen(false)} defaultValue={editRow !== null && rows[editRow]} />}
        < ToastContainer position='top-center' />
        </>
    )
}

export default Books;