import { Typography,Table,Avatar,Space  } from "antd";
import { DeleteOutlined,EditOutlined,MailOutlined } from '@ant-design/icons';
import { useState,useEffect } from "react";

function Messages(){
    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(false);

     // Fetch books data
  const getMessages = async () => {
    try {
      //https://gskibyagira-backend.onrender.com
      const response = await fetch('http://localhost:5000/api/messages/messages', {
        method: 'GET',
      });
      const json = await response.json();

      if (json && json.data) {
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
        <Space direction="vertical" >
            <Typography.Title level={4}>Messages</Typography.Title>
            <Table  columns={
                [
                    {
                        title:"User Name",
                        dataIndex:"Name"
                    },
                    {
                        title:"User Email",
                        dataIndex:"Email"
                    },
                    {
                        title:"Phone Number",
                        dataIndex:"Telephone"
                    },
                    {
                        title:"Message",
                        dataIndex:"Message"
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
                   
                </Table>
                  
        </Space>
            
        
    )
}
export default Messages;