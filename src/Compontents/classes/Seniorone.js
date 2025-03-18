import './seniorone.css';
import Header from '../Header/Header';
function seniorone(){
    return(
        <div className='fragment'>
        <div>
            <Header className="navbar"/>
        </div>
        <div className="seniorone">
                <form className='bookform'>
                    <div>
                <div className='formdiv'>
                    <label className='labelclass'>Student Name:</label>
                    <input type="text" name="studentName" />
                </div>
                <div className='formdiv'>
                    <label className='labelclass'>Student Class:</label>
                    <select name="bookLivel" className="select">
                        <option>S1A</option>
                        <option>S1B</option>
                        <option>S1C</option>
                        <option>S1D</option>
                        <option>S2A</option>
                        <option>S2B</option>
                        <option>S2C</option>
                        <option>S2D</option>
                        <option>S3A</option>
                        <option>S3B</option>
                        <option>S3C</option>
                        <option>S4LFK</option>
                        <option>S4MCB</option>
                        <option>S5LFK</option>
                        <option>S5MCB</option>
                        <option>S6LFK</option>
                        <option>S6MCB</option>
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
                        <option>P6</option>
                        <option>Nursery</option>
                    </select>
                </div>
                </div>
                <div>
                <div className='formdiv'>
                    <label className='labelclass'>Borrowing Date:</label>
                    <input type="Date" name="date" />
                </div>
                <div className='formdiv'>
                    <label className='labelclass'>Enter Bookk Code :</label>
                    <input type="text"/>
                </div>
                </div>
                <div>
                <div className='formdiv'>
                    <label className='labelclass'>Book Type :</label>
                    <select className="select" name="bookType">
                        <option>Kinyarwanda</option>
                        <option>Mathematics</option>
                        <option>English</option>
                        <option>History</option>
                        <option>Geography</option>
                        <option>Kiswahili</option>
                        <option>Biology</option>
                        <option>Literature in English</option>
                        <option>Physics</option>
                        <option>French</option>
                        <option>Chemistry</option>
                        <option>entreprenership</option>
                    </select>
                </div>
                <div className='formdiv'>
                    <label className='labelclass'>Book Level :</label>
                    <select name="bookLivel" className="select">
                        <option>S1</option>
                        <option>S2</option>
                        <option>S3</option>
                        <option>S4</option>
                        <option>S5</option>
                        <option>S6</option>
                        <option>P1</option>
                        <option>P2</option>
                        <option>P3</option>
                        <option>P4</option>
                        <option>P5</option>
                        <option>P6</option>
                        <option>Nursery</option>
                    </select>
                </div>
                </div>
                
            </form>
            <div className='button'><button type="sumbit" className='btn'>Save</button></div>
        </div>
        </div>
    )
}
export default seniorone;