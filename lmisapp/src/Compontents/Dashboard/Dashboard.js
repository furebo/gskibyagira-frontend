import AppHeader from './AppHeader';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import AppFooter from './AppFooter';
import Books from '../../Pages/Books';
import Users from '../../Pages/Users';
import Messages from '../../Pages/Messages';
import AdminDashboard from '../../Pages/Dashboard';
import BookBorrowed from '../../Pages/BooksBorrowed';
import BorrowingRecordingBooks from '../../Pages/Borrowing_recording_books';
import Event from '../../Pages/Events';
import Staff from '../../Pages/Staff';
import { Menu, Button } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  HomeOutlined,
  MessageOutlined,
  CalendarOutlined,
  UserOutlined,
  BookOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';

function Dashboard() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  //const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, []);

  const handleClick = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      setCurrent(e.key);
      setIsOpen(false);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => navigate("/", { replace: true });
  };

  // Memoized content rendering
  const RenderContent = useMemo(() => {
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
        return <BorrowingRecordingBooks />;
      case 'booksborrowed':
        return <BookBorrowed />;
      case 'event':
        return <Event />;
      case 'staff':
        return <Staff />;
      default:
        return <AdminDashboard />;
    }
  }, [current]);

  // Function to generate menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      { key: "dashboard", label: "Dashboard", icon: <HomeOutlined /> },
      { key: "logout", label: "Logout", icon: <UserOutlined /> },
    ];

    if (userRole === "Admin") {
      return [
        ...commonItems,
        { key: "user", label: "Users", icon: <UserOutlined /> },
        { key: "message", label: "Messages", icon: <MessageOutlined /> },
        { key: "book", label: "Books", icon: <BookOutlined /> },
        { key: "event", label: "Events", icon: <CalendarOutlined /> },
        { key: "borrowing_recording", label: "Books Records", icon: <BookOutlined /> },
        { key: "booksborrowed", label: "Books Borrowed", icon: <CalendarOutlined /> },
        { key: "staff", label: "Staff", icon: <BookOutlined /> },
        { key: "reports", label: "Reports", icon: <CalendarOutlined /> },
      ];
    } else if (userRole === "staff") {
      return [
        ...commonItems,
        { key: "book", label: "Books", icon: <BookOutlined /> },
        { key: "borrowing_recording", label: "Books Records", icon: <BookOutlined /> },
        { key: "booksborrowed", label: "Books Borrowed", icon: <CalendarOutlined /> },
        { key: "message", label: "Messages", icon: <MessageOutlined /> },
        { key: "reports", label: "Reports", icon: <CalendarOutlined /> },
      ];
    }
    return commonItems;
  };

  return (
    <div className='dashboard'>
      <AppHeader humbMenu={
         <Button
         className="hamburger-icon"
         icon={isOpen ? <CloseOutlined /> : <MenuOutlined />} // Toggle between hamburger and close icon
         onClick={toggleMenu}
       />} 
      />
      <div className='SideMenuAndPageContent'>
        <div className={`SideMenu ${isOpen ? "SideMenuopen" : ''}`}>
          <Menu  onClick={handleClick} selectedKeys={[current]}>
            {getMenuItems().map(item => (
              <Menu.Item key={item.key} icon={item.icon}>{item.label}</Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="PageContent">{RenderContent}</div>
      </div>
      <AppFooter />
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
}

export default Dashboard;
