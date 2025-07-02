import { ToastContainer } from "react-toastify";
import './index.css';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Homepage from "./Compontents/Homepage/Homepage";
import SignupModel from './Compontents/ModelSignup';
import NoPage from './Compontents/NoPage/NoPage';
import Login from './Compontents/Login/Login';
import Borrowbook from './Compontents/borrowBooks/borrowbook';
import BooksBorrowed from './Compontents/books/BooksBorrowed';
import Books from './Compontents/AllBooks/Books';
import AuthContextProvider from './Contexts/AuthContext';
import ProtectedRoutes from './Helpers/ProtectedRoutes';
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
      <ToastContainer 
      position="top-center" autoClose={3000}
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover 
      theme="colored" 
      />
     <AuthContextProvider>
          <Routes>
                <Route exact path="/" element = {<Homepage />} />
                <Route exact path="/signup" element = {<SignupModel />} />
                <Route exact path="*" element = {<NoPage />} />
                 <Route exact path="/login" element = {<Login />} />
                <Route exact path='/borrowbook' element = {<Borrowbook />} />                
                <Route exact path='/reset-password/:token' element = {<ResetPasswordModel />}/>
                <Route exact path='/request-password-reset' element = {<ForgotPasswordModel />}/>
                  {/* Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                       <Route exact path='/confirmemail' element = {<ConfirmEmail />}/>
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
