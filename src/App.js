import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Homepage from "./Compontents/Homepage/Homepage";
import Signup from "./Compontents/Signup/Signup";
import NoPage from './Compontents/NoPage/NoPage';
import Login from './Compontents/Login/Login';
import Admin from './Compontents/Admin/Admin';
import Primaryone from './Compontents/classesbooks/Primary1';
import Seniorone from './Compontents/classes/Seniorone';
import BooksBorrowed from './Compontents/books/BooksBorrowed';
import Books from './Compontents/AllBooks/Books';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
                <Route exact path="/" element = {<Homepage />} />
                <Route exact path="/signup" element = {<Signup />} />
                <Route exact path="*" element = {<NoPage />} />
                <Route exact path="/login" element = {<Login />} />
                <Route exact path='/admin' element = {<Admin />} />
                <Route exact path='primary1' element = {<Primaryone />} />
                <Route exact path='/seniorone' element = {<Seniorone />} />
                <Route exact path='/books' element = {<BooksBorrowed />} />
                <Route exact path='/allbooks' element = {<Books />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
