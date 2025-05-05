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
  const [choosenClass,setChoosenClass] = useState("")

  useEffect(() => {
    AllBorrowedBooks();
  }, []);

  async function AllBorrowedBooks() {
    const response = await fetch('https://gskibyagira-backend.onrender.com/api/books/borrowbook');
    const json = await response.json();
    setBorrowedBooks(json.data || []);
  }

  const handleGenerate = () => {

    const filtered = borrowedBooks.filter(book =>
      (selectedClass === 'All' || book.Student_Class === selectedClass) && (new Date(book.Borrowing_Date).getFullYear() === Number(selectedYear.split(" - ")[1])) && (book.Status.trim() === 'Not Submitted')
    );
    setFilteredBooks(filtered);
    setShowTable(true);
    setChoosenClass(`, Class ${selectedClass}`)
  };
// Function to export the table to excel 
const exportToExcel = () => {
  if (filteredBooks.length === 0) return;

  const header = [
    ['Borrower Name', 'Class','Book Title', 'Book Code', 'Borrow Date', 'Return Date (Overdue)'],
  ];

  const rows = filteredBooks.map(book => [
    book.Student_Name,
    book.Student_Class,
    book.Book_Type,
    book.Book_Number,
    new Date(book.Borrowing_Date),
    new Date(book.Return_Date),
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([...header, ...rows]);

  // Format "Borrow Date" and "Return Date" columns as date
  const dateFormat = 'yyyy-mm-dd';

  for (let i = 1; i <= filteredBooks.length; i++) {
    const borrowDateCell = worksheet[`E${i + 1}`];
    const returnDateCell = worksheet[`F${i + 1}`];
    if (borrowDateCell) borrowDateCell.z = dateFormat;
    if (returnDateCell) returnDateCell.z = dateFormat;
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
    cellDates: true, // Important: ensures Excel treats them as dates
  });

  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(dataBlob, `Unsubmitted_Books_Report${selectedClass}_${selectedYear}.xlsx`);
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
              <select>
                <option>Weekly Report</option>
                <option>Monthly Report</option>
                <option>Non submitted books (All)</option>
                <option>Non submitted books (Submission Date Overdue)</option>
              </select>
              <button className="generate-btn" onClick={handleGenerate}>Generate Periodic Report</button>
        </div> 
        </div>

        <div className='display'>
          {filteredBooks.length > 0 && (
            <i className="fas fa-cloud-upload-alt cloud-icon"></i>
          )}
          <h2>Unsubmitted Books Reports{choosenClass}</h2>
          {filteredBooks.length > 0 && (
                 <button className="export-btn" onClick={exportToExcel}>Export to Excel</button>
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
                  {filteredBooks.map((book, idx) => (
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
              <p>Your generated report will appear here.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Table;
