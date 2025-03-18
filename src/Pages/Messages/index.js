import { Typography,Table,Avatar,Space  } from "antd";
import { DeleteOutlined,EditOutlined,MailOutlined } from '@ant-design/icons';
import { useState,useEffect } from "react";
import './index.css';
function Messages(){
    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(false);

     // Fetch books data
  const getMessages = async () => {
    try {
      //
      const response = await fetch('https://gskibyagira-backend.onrender.com/api/messages/messages', {
        method: 'GET',
      });
      const json = await response.json();
      console.log(json);

      if (json && json.data) {
        console.log("The json object is:",json);
        console.log("The json.data object is:",json.data);
        const messagesWithKey = json.data.map((message) => ({
          ...message,
          key: message.id,
        }));
        setDataSource(messagesWithKey);
      } else {
        console.error('No data found in the response');
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };
    useEffect(()=>{
        setLoading(true);
        getMessages();
        setLoading(false);
    },[]);
    return(
      
        <Space direction="vertical" className="tableMessages" >
            <Typography.Title level={4} >Messages</Typography.Title>
            <Table  columns={
                [
                    {
                        title:"User firstName",
                        dataIndex:"firstName"
                    },
                    {
                      title:"User lastName",
                      dataIndex:"lastName"
                  },
                    {
                        title:"User Email",
                        dataIndex:"email"
                    },
                    {
                        title:"Phone Number",
                        dataIndex:"telephone"
                    },
                    {
                        title:"Message",
                        dataIndex:"message"
                    },
                    {
                        title:"Actions",
                        render:()=>{
                            return <Space>
                            <DeleteOutlined style={{color:'red'}}/>
                             <EditOutlined style={{color:'blue'}}/>
                            </Space>
                        }
                    },
                ]} 
                dataSource={dataSource}
                pagination={{pageSize:5}}
                loading={loading} >
                scroll={{ x: "max-content" }} // Enables horizontal scrolling
                </Table>
                  
        </Space>
           
        
    )
}
export default Messages;