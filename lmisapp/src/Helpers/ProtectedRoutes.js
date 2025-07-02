import {Outlet,Navigate} from 'react-router-dom';
const ProtectedRoutes = () =>{
    let token = localStorage.getItem("userToken")
   
 return (
    token ? <Outlet /> : <Navigate to="/login" />
 )
}

export default ProtectedRoutes