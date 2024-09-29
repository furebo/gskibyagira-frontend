import './index.css';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Homepage from "./Compontents/Homepage/Homepage";
import Signup from "./Compontents/Signup/Signup";
import NoPage from './Compontents/NoPage/NoPage';
import Login from './Compontents/Login/Login';
import Primaryone from './Compontents/classesbooks/Primary1';
import Borrowbook from './Compontents/borrowBooks/borrowbook';
import BooksBorrowed from './Compontents/books/BooksBorrowed';
import Books from './Compontents/AllBooks/Books';
import MessageBox from './Compontents/Messagebox/Messagebox';
import AuthContextProvider from './Contexts/AuthContext';
//import AppMap from './Compontents/MapAndState';
import ProtectedRoutes from './Helpers/ProtectedRoutes';
import {UserRole} from './Compontents/UserRole/UserRole';
import Levels from './Compontents/Levels/Levels';
import MapComponent from './Compontents/MapComponent/Map';
import Posts from './Compontents/Posts/post';
import Dashboard from './Compontents/Dashboard/Dashboard';
import Inventory from './Pages/Books';
import Table from './Compontents/bootstrapTable';
import NestedSelect from './Compontents/nestedSelect';


function App() {
  return (
    <div className="App">
     <AuthContextProvider>
      
          <Routes>
                <Route exact path="/" element = {<Homepage />} />
                <Route exact path="/signup" element = {<Signup />} />
                <Route exact path="*" element = {<NoPage />} />
                 <Route exact path="/login" element = {<Login />} /> 
                <Route exact path='primary1' element = {<Primaryone />} />
                <Route exact path='/borrowbook' element = {<Borrowbook />} />
                <Route exact path='/message' element = {<MessageBox/>} />
                <Route exact path='/mapmap' element = {<MapComponent/>} />
                <Route exact path='/userole' element = {<UserRole />}/>
                <Route exact path='/levels' element = {<Levels />}/>
                  {/* Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                      <Route exact path="/books" element={<BooksBorrowed />} />
                      <Route exact path="/allbooks" element={<Books />} />
                </Route>
                <Route exact path='/posts' element = {<Posts/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/inventory" element={<Inventory/>}/>  
                <Route path="/table" element={<Table />}/> 
                <Route path="/nested" element={<NestedSelect />}/>
                 
          </Routes>
      
      </AuthContextProvider>
    </div>
  );
}

export default App;
