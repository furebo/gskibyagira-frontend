import { Space, Typography, Badge } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import {UserOutlined} from '@ant-design/icons';
import './index.css';
import { useEffect, useState, useContext } from "react";
import { useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

//let import the context to get the user in order to use the user data to dashboard
import {AuthContext} from '../../../Contexts/AuthContext';


function AppHeader({ humbMenu }) {
    const {auth} = useContext(AuthContext);
    const[messages, setMessages] = useState([]);
    let messages_count = messages.length
  // Fetch messages from the backend
    useEffect(() => {
      const fetchMessages = async () => {
        //
        try {
          const response = await fetch("https://gskibyagira-backend.onrender.com/api/messages/messages");
          const result = await response.json();
  
          if (response.ok) {
            setMessages(result.data.reverse()); // Reverse to show newest messages first
           
          } else {
            console.error("Failed to fetch messages:", result.error);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
  
      fetchMessages();
    }, []);

    let navigate = useNavigate();

    const handleClick = () =>{
        navigate('/');
    }

    return (
        <div className="AppHeader">
            {humbMenu}  {/* This will render the hamburger button */}
            <div className="logo_place">
            <Link to="/" className="sitetitle" >GS KIBYAGIRA</Link>
            </div>
            <marquee>
            <Typography.Title 
                className="typographeader" 
                style={{ marginTop: 20, color: 'white', fontFamily: 'sans-serif', fontSize: '2rem' }}>
                  Welcome To Books Management Information System (BMIS) GS Kibyagira - Buruhukiro
            </Typography.Title>
            </marquee>
            <Typography.Text  type="secondary" style={{color:"white",width:"340px",fontSize:"20px",paddingLeft:"15px",display:"flex", justifyContent:"space-between", paddingRight:"15px"}}>
              <strong> {auth.user?.firstName || auth.user?.name || 'Logged in as Guest'}</strong>
              {auth.user?.picture && (
                                       <img
                                       src={auth.user.picture || <UserOutlined />}
                                       className="logged_in_user"
                                       style={{
                                                 width: 36,
                                                 height: 36,
                                                 borderRadius: '50%',
                                                 border: '2px solid white',
                                                 objectFit: 'cover'
                                              }}
                                        />
                                   )}
            </Typography.Text>
            {/* <Space>
                <Badge count={messages.length} dot className="notification" onClick={handleClick}>
                    <MailOutlined style={{ fontSize: 24, color: "white" }} />
                </Badge>
                <Badge count={messages_count} className="notification" onClick={handleClick}>
                    <BellFilled style={{ fontSize: 24, color: "white" }} />
                </Badge>
            </Space> */}
        </div>
    );
}

export default AppHeader;
