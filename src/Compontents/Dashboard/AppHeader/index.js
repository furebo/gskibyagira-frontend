// import { Space, Typography, Badge } from "antd";
// import {MailOutlined,BellFilled} from "@ant-design/icons";
// import './index.css'

// function AppHeader(props){
//     return(
//         <div className="AppHeader">
//             <h1>{props.humbMenu}</h1>
//             <Typography.Title className="typographeader" style={{marginTop:20,color:'white',fontFamily:'sans-serif',fontSize:'2rem'}}>Welcome To LAMIS GS Kibyagira - Buruhukiro</Typography.Title>
            
//             <Space>
//                 <Badge count={10} dot>
//                      <MailOutlined style={{fontSize:24,color:"white"}} />   
//                 </Badge>
//                 <Badge count={20}>
//                      <BellFilled style={{fontSize:24,color:"white"}} />
//                 </Badge>
//             </Space>
//         </div>
//     )
// }
// export default AppHeader;

import { Space, Typography, Badge } from "antd";
import { MailOutlined, BellFilled } from "@ant-design/icons";
import './index.css';

function AppHeader({ humbMenu }) {
    return (
        <div className="AppHeader">
            {humbMenu}  {/* This will render the hamburger button */}
            <Typography.Title 
                className="typographeader" 
                style={{ marginTop: 20, color: 'white', fontFamily: 'sans-serif', fontSize: '2rem' }}>
                Welcome To LAMIS GS Kibyagira - Buruhukiro
            </Typography.Title>
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
