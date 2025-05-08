import React, { useEffect, useState } from 'react';
import './index.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function Table() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedYear, setSelectedYear] = useState('2022 - 2023');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [choosenClass,setChoosenClass] = useState("");
  //state for showing periodic report type
  const [selectedPeriodicType, setSelectedPeriodicType] = useState("Weekly Report");
  const [showPeriodicReportTable, setShowPeriodicReportTable] = useState(false);
  const [unSubmittedTitle, setUnSubmittedTitle]= useState(false);
  const [secondaryFilteredBooks, setSecondaryFilteredBooks] = useState([]);
  const [primaryFilteredBooks, setPrimaryFilteredBooks] = useState([]);
  const [choosenTitlePrimary, setChoosenTitlePrimary] = useState("");
  const [choosenTitleSecondary, setChoosenTitleSecondary] = useState("");
  const [periodicReportGeneratedExport, setPeriodicReportGenerated] = useState(false);
  const [primarySecondaryReportExport, setPrimarySecondaryReportExport] = useState(false);

  useEffect(() => {
    AllBorrowedBooks();
  }, []);

  async function AllBorrowedBooks() {
    const response = await fetch('https://gskibyagira-backend.onrender.com/api/books/borrowbook');
    const json = await response.json();
    setBorrowedBooks(json.data || []);
  }
 
//function to generate unborrowed books
  const handleGenerate = () => {
    const filtered = borrowedBooks.filter(book =>
      (selectedClass === 'All' || book.Student_Class === selectedClass) && (new Date(book.Borrowing_Date).getFullYear() === Number(selectedYear.split(" - ")[1])) && (book.Status.trim() === 'Not Submitted')
    );
    setUnSubmittedTitle(false);
    setPeriodicReportGenerated(false);
    setPrimarySecondaryReportExport(true);
    setFilteredBooks(filtered);
    setShowPeriodicReportTable(false);
    setShowTable(true);
    setChoosenClass(`, Class ${selectedClass}`)
  };

  //function to generate periodic reports
  const periodic_report_handleGenerate = () => {
    if (selectedPeriodicType === "Weekly Report") {
      const secondary_books = borrowedBooks.filter(book =>
        ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].includes(book.Book_Level)
      );
      const primary_books = borrowedBooks.filter(book =>
        ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].includes(book.Book_Level)
      );
      setUnSubmittedTitle(true);
      setPeriodicReportGenerated(true);
      setPrimarySecondaryReportExport(false);
      setSecondaryFilteredBooks(secondary_books);
      setPrimaryFilteredBooks(primary_books);
      setChoosenTitlePrimary("GS Kibyagira Weekly Report Books Primary Level");
      setChoosenTitleSecondary("GS Kibyagira Weekly Report Books Secondary Level");
      setShowTable(false);
      setShowPeriodicReportTable(true);
    }
  
    // Add other types logic here later if needed
  };
  
// Function to export the table of unborrowed books to excel with custom header at the top of the table
const exportToExcel = () => {
  if (filteredBooks.length === 0) return;

  // Custom heading rows (each array is one row)
  const locationHeader = [
    ['Southern Province'],
    ['Nyamagabe District'],
    ['Buruhukiro Sector'],
    ['GS Kibyagira'],
    [''], // Empty row for spacing
    [`Unsubmitted Books Report${choosenClass} - Academic Year: ${selectedYear}`],
    [''], // Another empty row before table header
  ];

  const locationFooter = [
    [''],
    [''],
    ['Prepared By Librarian Furebo Didace'],
    ['Approuved By Head Teacher Rev. UZABAKIRIHO Edouard'],
    [`on ${new Date().getDate()} - ${new Date().getMonth() +1 } - ${new Date().getFullYear()}`],
  ]

  // Table header
  const tableHeader = [
    ['Borrower Name', 'Class', 'Book Title', 'Book Code', 'Borrow Date', 'Return Date (Overdue)'],
  ];

  const rows = filteredBooks.map(book => [
    book.Student_Name,
    book.Student_Class,
    book.Book_Type,
    book.Book_Number,
    new Date(book.Borrowing_Date),
    new Date(book.Return_Date),
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([...locationHeader, ...tableHeader, ...rows, ...locationFooter]);
  // Format "Borrow Date" and "Return Date" columns as date
  const dateFormat = 'yyyy-mm-dd';
  const headerOffset = locationHeader.length + 1; // +1 for the tableHeader row

  for (let i = 0; i < filteredBooks.length; i++) {
    const borrowDateCell = worksheet[`E${i + headerOffset + 1}`]; // +1 for 1-based Excel index
    const returnDateCell = worksheet[`F${i + headerOffset + 1}`];
    if (borrowDateCell) borrowDateCell.z = dateFormat;
    if (returnDateCell) returnDateCell.z = dateFormat;
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
    cellDates: true,
  });

  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(dataBlob, `Unsubmitted_Books_Report${selectedClass}_${selectedYear}.xlsx`);
};

// Working on pagination of the table inside the div of className 'display'
const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 5;

const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;
const currentBooks = filteredBooks.slice(indexOfFirstRow, indexOfLastRow);

const totalPages = Math.ceil(filteredBooks.length / rowsPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
// Function to export Primary and secondary weeklyy reports into one excel file
const exportWeeklyReportsToExcel = () => {
  const workbook = XLSX.utils.book_new();
  // === SHEET 1: Primary Weekly Report ===
  const primaryHeader = [
    ['Weekly Report Books - Primary Level'],
    [''],
  ];
  const primaryTableHeader = [
    ['NR', 'UMURENGE', 'ISHULI', 'BOOK TITLE', 'TOTAL BOOKS', 'WEEKLY BORROWED', 'PERCENTAGE', 'REMARKS']
  ];
  const primaryRows = primaryFilteredBooks.map((book, idx) => [
    idx + 1,
    'BURUHUKIRO',
    'GS Kibyagira',
    book.Book_Type,
    450, // Replace with actual total if available
    380, // Replace with actual borrowed if available
    '84.4%', // Replace with actual percentage
    'ok',
  ]);

  const primarySheet = XLSX.utils.aoa_to_sheet([
    ...primaryHeader,
    ...primaryTableHeader,
    ...primaryRows,
  ]);
  XLSX.utils.book_append_sheet(workbook, primarySheet, 'Primary Weekly Report');


  // === SHEET 2: Secondary Weekly Report ===
  const secondaryHeader = [
    ['Weekly Report Books - Secondary Level'],
    [''],
  ];
  const secondaryTableHeader = [
    ['NR', 'UMURENGE', 'ISHULI', 'BOOK TITLE', 'TOTAL BOOKS', 'WEEKLY BORROWED', 'PERCENTAGE', 'REMARKS']
  ];
  const secondaryRows = secondaryFilteredBooks.map((book, idx) => [
    idx + 1,
    'BURUHUKIRO',
    'GS Kibyagira',
    book.Book_Type,
    450,
    380,
    '88.5%',
    'ok',
  ]);

  const secondarySheet = XLSX.utils.aoa_to_sheet([
    ...secondaryHeader,
    ...secondaryTableHeader,
    ...secondaryRows,
  ]);
  XLSX.utils.book_append_sheet(workbook, secondarySheet, 'Secondary Weekly Report');


  // === DOWNLOAD EXCEL FILE ===
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(dataBlob, `GS_Kibyagira_Weekly_Reports_${new Date().toISOString().split('T')[0]}.xlsx`);
};


  return (
    <div className='content_reports'>
      <div className='report_type'>
        <h1>GS Kibyagira - Buruhukiro Books Reports</h1>
        <hr />
      </div>
      <div className='section_and_display'>
        <div className='left_selection'>
        <div className='selection'>
          <h2>Unsubmitted Books Reports</h2>
          <div className='year_selection'>
            <h3>Select Academic Year</h3>
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
              <option>2022 - 2023</option>
              <option>2023 - 2024</option>
              <option>2024 - 2025</option>
              <option>2025 - 2026</option>
            </select>
          </div>
          <div className='report_all'>
            <div className='class_selection'>
              <h3>Select Class</h3>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                <option>All</option>
                <option>Nursary(N1,N2,N3)</option>
                <option>P1A</option>
                <option>P1B</option>
                <option>P1C</option>
                <option>P1D</option>
                <option>P1E</option>
                <option>P1F</option>
                <option>P2A</option>
                <option>P2B</option>
                <option>P2C</option>
                <option>P2D</option>
                <option>P3A</option>
                <option>P3B</option>
                <option>P3C</option>
                <option>P4A</option>
                <option>P4B</option>
                <option>P4C</option>
                <option>P5A</option>
                <option>P5B</option>
                <option>P5C</option>
                <option>P6A</option>
                <option>P6B</option>
                <option>S1A</option>
                <option>S1B</option>
                <option>S1C</option>
                <option>S1D</option>
                <option>S2A</option>
                <option>S2B</option>
                <option>S2C</option>
                <option>S3A</option>
                <option>S3B</option>
                <option>S4LFK</option>
                <option>S4MCB</option>
                <option>S5LFK</option>
                <option>S5MCB</option>
                <option>S6LFK</option>
                <option>S6MCB</option>
                <option>TEACHERS</option>
              </select>
            </div>
          </div>
          <button className="generate-btn" onClick={handleGenerate}>Generate Report</button>
        </div>
        <div className='periodic_report'>
              <h3>Periodic Reports</h3>
              <select value={selectedPeriodicType} onChange={(e) => setSelectedPeriodicType(e.target.value)}>
                <option> Weekly Report</option>
                <option>Monthly Report</option>
                <option>Non submitted books (All)</option>
                <option>Non submitted books (Submission Date Overdue)</option>
              </select>
              <button className="periodic-report-generate-btn" onClick={periodic_report_handleGenerate}>Generate Periodic Report</button>
        </div> 
        </div>

        <div className='display'>
          {filteredBooks.length > 0 && (
            <i className={unSubmittedTitle ? 'hide_unSubmitted_title' :'fas fa-cloud-upload-alt cloud-icon'}></i>
          )}
          
          <h2 className={unSubmittedTitle ? 'hide_unSubmitted_title' :''}>Unsubmitted Books Reports{choosenClass}</h2>
          {filteredBooks.length > 0 && (
                 <button className= {periodicReportGeneratedExport ? 'hide_unsubmitted_title' : 'export-btn'} onClick={exportToExcel}>Export to Excel</button>
            )}
          

          {showTable ? (
            filteredBooks.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Book Code</th>
                    <th>Borrower Name</th>
                    <th>Class</th>
                    <th>Borrow Date</th>
                    <th>Return Date (Overdue)</th>
                  </tr>
                </thead>
                <tbody>
                {currentBooks.map((book, idx) => (
                      <tr key={idx}>
                          <td>{book.Book_Type}</td>
                          <td>{book.Book_Number}</td>
                          <td>{book.Student_Name}</td>
                          <td>{book.Student_Class}</td>
                          <td>{book.Borrowing_Date}</td>
                          <td style={{ color: new Date(book.Return_Date) < new Date() ? 'red' : 'black' }}>
                               {book.Return_Date}
                          </td>
                      </tr>
                    ))}

                </tbody>
              </table>
            ) : (
              <>
              <i className="fas fa-cloud-upload-alt cloud-icon"></i>
              <p> There are no unborrowed books found for selected criteria.</p>
              </>
            )
          ) : (
            <>
              <i className="fas fa-cloud-upload-alt cloud-icon"></i>
              <p className={unSubmittedTitle ? 'hide_unSubmitted_title' :''} >Your generated report will appear here.</p>
            </>
          )}
  <button className={primarySecondaryReportExport ? 'hide_export_button' : 'export-periodic-report-btn'}  onClick={exportWeeklyReportsToExcel}>
           Export To Excel Weekly Reports (Primary & Secondary)
  </button>

  {showPeriodicReportTable && (
  <div>
    <h2>{choosenTitlePrimary}</h2>
    {primaryFilteredBooks.length > 0 ? (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>NR</th>
            <th>UMURENGE</th>
            <th>ISHULI</th>
            <th>UBWOKO BW'IBITABO</th>
            <th>UMUBARE BIRIHO</th>
            <th>BYATIWE CYUMWERU</th>
            <th>IJANISHA</th>
            <th>ICYONGERWAHO</th>
          </tr>
        </thead>
        <tbody>
          {primaryFilteredBooks.map((book, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>BURUHUKIRO</td>
              <td>GS KIBYAGIRA</td>
              <td>{book.Book_Type}</td>
              <td>450</td>
              <td>380</td>
              <td>88.5%</td>
              <td>ok</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : <p>No Primary Weekly Report</p>}

    <h2>{choosenTitleSecondary}</h2>
    {secondaryFilteredBooks.length > 0 ? (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>NR</th>
            <th>UMURENGE</th>
            <th>ISHULI</th>
            <th>UBWOKO BW'IBITABO</th>
            <th>UMUBARE BIRIHO</th>
            <th>BYATIWE CYUMWERU</th>
            <th>IJANISHA</th>
            <th>ICYONGERWAHO</th>
          </tr>
        </thead>
        <tbody>
          {secondaryFilteredBooks.map((book, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>BURUHUKIRO</td>
              <td>GS KIBYAGIRA</td>
              <td>{book.Book_Type}</td>
              <td>450</td>
              <td>380</td>
              <td>88.5%</td>
              <td>ok</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : <p>No Secondary Weekly Report</p>}
  </div>
)}

          <div className="paginationn">
                 {Array.from({ length: totalPages }, (_, i) => (
                <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={currentPage === i + 1 ? 'active-page' : ''}
                  >
                        {i + 1}
                 </button>
  ))}
</div>

        </div>
      </div>
    </div>
  );
}

export default Table;
