import AppHeader from './AppHeader';
import {useNavigate} from 'react-router-dom';
import './Dashboard.css';
import AppFooter from './AppFooter';
import Books from '../../Pages/Books';
import Users from '../../Pages/Users';
import Messages from '../../Pages/Messages';
import AdminDashboard from '../../Pages/Dashboard';
import BookBorrowed from '../../Pages/BooksBorrowed';
import Borrowing_recording_books from '../../Pages/Borrowing_recording_books';
import Event from '../../Pages/Events';
import Staff from '../../Pages/Staff';
import { Menu, Button } from 'antd';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import {HomeOutlined,MessageOutlined,CalendarOutlined,UserOutlined,BookOutlined,MenuOutlined} from '@ant-design/icons';

function Dashboard(){
  const navigate = useNavigate();
    const [current, setCurrent] = useState('dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState("");

    useEffect(()=>{
          // Get the token from localStorage (or sessionStorage)
          
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get user information
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);  // Set the role from the decoded token
    }
    },[])
     
    const handleClick = (e) => {
      if (e.key === "logout") {
        handleLogout(); // Call logout function when clicked
    } else {
        setCurrent(e.key);
        setMenuOpen(false);
    }
    };

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
      setIsOpen(!isOpen);
    };

    function RenderContent(){ 
      switch (current) {
        case 'dashboard':
          return <AdminDashboard className="admin_dashboard"/>;
        case 'user':
          return <Users />;
        case 'message':
            return <Messages />;
        case 'book':
            return <Books />;
        case 'borrowing_recording':
            return <Borrowing_recording_books/>
        case 'booksborrowed':
            return<BookBorrowed />
        case 'event':
            return <Event />
        case 'staff':
            return <Staff />
        default:
          return <Dashboard />;
      }
    
    };

    const handleLogout = () => {
      localStorage.removeItem('token'); // Remove token
      navigate('/'); // Redirect to login page
  };

    return(
    <div className='dashboard'>
        <AppHeader humbMenu={<Button className="hamburger-icon" icon={<MenuOutlined />} onClick={toggleMenu} />} />
        <div className='SideMenuAndPageContent'>
            <div className={`SideMenu ${isOpen ? "SideMenuopen" : ''}`}>
                <Menu className="SideMenu" onClick={handleClick} selectedKeys={[current]}>
                  {/* If a user is an admin*/}
                  {userRole === 'Admin' && (
                    <>
                     <Menu.Item icon={<HomeOutlined/>} key="dashboard">Dashboard</Menu.Item>
                     <Menu.Item icon={<UserOutlined/>} key="user">Users</Menu.Item>
                     <Menu.Item icon={<MessageOutlined/>} key="message">Messages</Menu.Item>
                     <Menu.Item icon={<BookOutlined/>} key="book">Books</Menu.Item>
                     <Menu.Item icon={<CalendarOutlined/>} key="event">Events</Menu.Item>
                     <Menu.Item icon={<BookOutlined/>} key="borrowing_recording">Books Records</Menu.Item>
                     <Menu.Item icon={<CalendarOutlined/>} key="booksborrowed">Books Borrowed</Menu.Item>
                     <Menu.Item icon={<BookOutlined/>} key="staff">Staff</Menu.Item>
                     <Menu.Item icon={<CalendarOutlined/>} key="reports">Reports</Menu.Item>
                     <Menu.Item icon={<UserOutlined/>} key="logout">Logout</Menu.Item>
                    </>
                  )}
                   {/* If a user is a staff member*/}
                   {userRole === 'staff' && (
                    <>
                    <Menu.Item icon={<BookOutlined/>} key="book">Books</Menu.Item>
                    <Menu.Item icon={<BookOutlined/>} key="borrowing_recording">Books Records</Menu.Item>
                    <Menu.Item icon={<CalendarOutlined/>} key="booksborrowed">Books Borrowed</Menu.Item>
                    <Menu.Item icon={<MessageOutlined/>} key="message">Messages</Menu.Item>
                    <Menu.Item icon={<CalendarOutlined/>} key="reports">Reports</Menu.Item>
                    <Menu.Item icon={<UserOutlined/>} key="logout">Logout</Menu.Item>
                    </>
                   )}
                </Menu>
             </div>
             <div className="PageContent">
                {RenderContent()} 
             </div>
        </div>
        <AppFooter></AppFooter>
        {/* Overlay to close the menu when clicking outside */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
    )        
}
export default Dashboard

