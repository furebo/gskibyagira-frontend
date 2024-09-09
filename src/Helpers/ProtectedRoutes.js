import {useContext} from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
const ProtectedRoutes = () =>{
    //Let get the token from the AuthContext or from the local storage
    const {auth} = useContext(AuthContext);
    let token = auth.token ||localStorage.getItem("userToken")
    token = true
 return (
    token ? <Outlet /> : <Navigate to="/login" />
 )
}

export default ProtectedRoutes