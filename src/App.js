import './index.css';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Homepage from "./Compontents/Homepage/Homepage";
//import Signup from "./Compontents/Signup/Signup";
import SignupModel from './Compontents/ModelSignup';
import NoPage from './Compontents/NoPage/NoPage';
import Login from './Compontents/Login/Login';
import Primaryone from './Compontents/classesbooks/Primary1';
import Borrowbook from './Compontents/borrowBooks/borrowbook';
import BooksBorrowed from './Compontents/books/BooksBorrowed';
import Books from './Compontents/AllBooks/Books';
import MessageBox from './Compontents/Messagebox/Messagebox';
import AuthContextProvider from './Contexts/AuthContext';
import ProtectedRoutes from './Helpers/ProtectedRoutes';

import Levels from './Compontents/Levels/Levels';
import MapComponent from './Compontents/MapComponent/Map';
import Dashboard from './Compontents/Dashboard/Dashboard';
import Inventory from './Pages/Books';
import Table from './Compontents/bootstrapTable';
import NestedSelect from './Compontents/nestedSelect';
import ConfirmEmail from './Pages/confirmEmail';
import ResetPasswordModel from './Compontents/ModelResetPassword';
import ForgotPasswordModel from './Compontents/ModelForgetPassword';

function App() {
  return (
    <div className="App">
     <AuthContextProvider>
      
          <Routes>
                <Route exact path="/" element = {<Homepage />} />
                <Route exact path="/signup" element = {<SignupModel />} />
                <Route exact path="*" element = {<NoPage />} />
                 <Route exact path="/login" element = {<Login />} /> 
                <Route exact path='primary1' element = {<Primaryone />} />
                <Route exact path='/borrowbook' element = {<Borrowbook />} />
                <Route exact path='/message' element = {<MessageBox/>} />
                <Route exact path='/mapmap' element = {<MapComponent/>} />
                <Route exact path='/levels' element = {<Levels />}/>
                <Route exact path='/confirmemail' element = {<ConfirmEmail />}/>
                <Route exact path='/reset-password/:token' element = {<ResetPasswordModel />}/>
                <Route exact path='/request-password-reset' element = {<ForgotPasswordModel />}/>
                  {/* Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                      <Route exact path="/books" element={<BooksBorrowed />} />
                      <Route exact path="/allbooks" element={<Books />} />
                </Route>
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
