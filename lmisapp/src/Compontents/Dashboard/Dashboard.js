import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Menu, Button } from 'antd';
import {
  HomeOutlined,
  MessageOutlined,
  CalendarOutlined,
  UserOutlined,
  BookOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import './Dashboard.css';

import AdminDashboard from '../../Pages/Dashboard';
import Books from '../../Pages/Books';
import Users from '../../Pages/Users';
import Messages from '../../Pages/Messages';
import BookBorrowed from '../../Pages/BooksBorrowed';
import BorrowingRecordingBooks from '../../Pages/Borrowing_recording_books';
import Event from '../../Pages/Events';
import Staff from '../../Pages/Staff';
import Reports from '../../Pages/Reports';

function Dashboard() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // Initially null to show loading
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (err) {
        console.error('Invalid token:', err);
        navigate('/', { replace: true });
      }
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (userRole) {
      const items = generateMenuItems(userRole);
      setMenuItems(items);
      setCurrent(items[0].key); // Default to the first item
    }
  }, [userRole]);

  const generateMenuItems = (role) => {
    const baseItems = [
      { key: 'dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
      { key: 'logout', label: 'Logout', icon: <UserOutlined /> },
    ];

    const adminItems = [
      { key: 'user', label: 'Users', icon: <UserOutlined /> },
      { key: 'message', label: 'Messages', icon: <MessageOutlined /> },
      { key: 'book', label: 'Books', icon: <BookOutlined /> },
      { key: 'event', label: 'Events', icon: <CalendarOutlined /> },
      { key: 'borrowing_recording', label: 'Books Records', icon: <BookOutlined /> },
      { key: 'booksborrowed', label: 'Books Borrowed', icon: <CalendarOutlined /> },
      { key: 'staff', label: 'Staff', icon: <BookOutlined /> },
      { key: 'report', label: 'Reports', icon: <CalendarOutlined /> },
    ];

    const staffItems = [
      { key: 'book', label: 'Books', icon: <BookOutlined /> },
      { key: 'borrowing_recording', label: 'Books Records', icon: <BookOutlined /> },
      { key: 'booksborrowed', label: 'Books Borrowed', icon: <CalendarOutlined /> },
      { key: 'message', label: 'Messages', icon: <MessageOutlined /> },
      { key: 'report', label: 'Reports', icon: <CalendarOutlined /> },
    ];

   
  if (role === 'Admin') {
    return [...baseItems, ...adminItems];
  } else if (role === 'Staff') {
    return [...baseItems, ...staffItems];
  } else {
    return baseItems;
  }
  };

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      localStorage.removeItem('token');
      navigate('/', { replace: true });
    } else {
      setCurrent(e.key);
      setIsOpen(false);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

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
      case 'report':
        return <Reports />;
      default:
        return <AdminDashboard />;
    }
  }, [current]);

  // Loading UI while user role is being fetched
  if (!userRole) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <AppHeader
        humbMenu={
          <Button
            className="hamburger-icon"
            icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
            onClick={toggleMenu}
          />
        }
      />
      <div className="SideMenuAndPageContent">
        <div className={`SideMenu ${isOpen ? 'SideMenuopen' : ''}`}>
          <Menu mode='inline' onClick={handleMenuClick} selectedKeys={[current]}>
            {menuItems.map((item) => (
              <Menu.Item className="icon_label" key={item.key} icon={item.icon} style={{ fontSize: '15px' }}>
              {item.label}
              </Menu.Item>
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
