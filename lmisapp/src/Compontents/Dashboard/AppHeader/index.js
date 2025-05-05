import { Space, Typography, Badge } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import './index.css';
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';

function AppHeader({ humbMenu }) {
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
            <marquee>
            <Typography.Title 
                className="typographeader" 
                style={{ marginTop: 20, color: 'white', fontFamily: 'sans-serif', fontSize: '2rem' }}>
                  Welcome To Books Management Information System (BMIS) GS Kibyagira - Buruhukiro
            </Typography.Title>
            </marquee>
            <Space>
                <Badge count={messages.length} dot className="notification" onClick={handleClick}>
                    <MailOutlined style={{ fontSize: 24, color: "white" }} />
                </Badge>
                <Badge count={messages_count} className="notification" onClick={handleClick}>
                    <BellFilled style={{ fontSize: 24, color: "white" }} />
                </Badge>
            </Space>
        </div>
    );
}

export default AppHeader;
