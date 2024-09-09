import AppHeader from './AppHeader';
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
import { useState } from 'react';
import {HomeOutlined,MessageOutlined,CalendarOutlined,UserOutlined,BookOutlined,MenuOutlined} from '@ant-design/icons';

function Dashboard(){
    const [current, setCurrent] = useState('dashboard');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
     
    const handleClick = (e) => {
      setCurrent(e.key);
      setMenuOpen(false); // Close menu on item click
    };

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
      setIsOpen(!isOpen);
    };

    function RenderContent(){ 
      switch (current) {
        case 'dashboard':
          return <AdminDashboard />;
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
  
    return(
    <div className='dashboard'>
        <AppHeader humbMenu={<Button className="hamburger-icon" icon={<MenuOutlined />} onClick={toggleMenu} />} />
        <div className='SideMenuAndPageContent'>
            <div className={`SideMenu ${isOpen ? "SideMenuopen" : ''}`}>
                <Menu className="SideMenu" onClick={handleClick} selectedKeys={[current]}>
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

