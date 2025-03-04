import { Space, Typography, Badge } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import './index.css';

function AppHeader({ humbMenu }) {
    return (
        <div className="AppHeader">
            {humbMenu}  {/* This will render the hamburger button */}
            <marquee>
            <Typography.Title 
                className="typographeader" 
                style={{ marginTop: 20, color: 'white', fontFamily: 'sans-serif', fontSize: '2rem' }}>
                  Welcome To BMIS GS Kibyagira - Buruhukiro
            </Typography.Title>
            </marquee>
            <Space>
                <Badge count={10} dot>
                    <MailOutlined style={{ fontSize: 24, color: "white" }} />
                </Badge>
                <Badge count={20}>
                    <BellFilled style={{ fontSize: 24, color: "white" }} />
                </Badge>
            </Space>
        </div>
    );
}

export default AppHeader;
