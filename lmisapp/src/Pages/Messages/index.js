import { Typography, Table, Space, Modal, message as AntMessage, Input, Form, Button } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import './index.css';

function Messages() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);
    const [form] = Form.useForm(); // Ant Design form instance

    // Fetch messages data
    const getMessages = async () => {
        try {
            const response = await fetch('https://gskibyagira-backend.onrender.com/api/messages/messages', {
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

    useEffect(() => {
        setLoading(true);
        getMessages();
        setLoading(false);
    }, []);

    // Delete message function
    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Are you sure you want to delete this message?",
            okText: "Yes",
            cancelText: "No",
            okType: "danger",
            onOk: async () => {
                try {
                    const response = await fetch(`https://gskibyagira-backend.onrender.com/api/messages/messages/${id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        AntMessage.success("Message deleted successfully!");
                        setDataSource((prevData) => prevData.filter(item => item.id !== id));
                    } else {
                        AntMessage.error("Failed to delete message.");
                    }
                } catch (error) {
                    console.error('Delete request failed:', error);
                    AntMessage.error("An error occurred while deleting.");
                }
            },
        });
    };

    // Edit message function
    const handleEdit = (record) => {
        setEditingMessage(record);
        form.setFieldsValue(record); // Pre-fill form with current data
        setIsEditModalVisible(true);
    };

    // Update message in the backend
    const handleUpdate = async () => {
        try {
            const values = form.getFieldsValue(); // Get updated values
            const response = await fetch(`https://gskibyagira-backend.onrender.com/api/messages/messages/${editingMessage.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                AntMessage.success("Message updated successfully!");
                setDataSource(prevData =>
                    prevData.map(item => item.id === editingMessage.id ? { ...item, ...values } : item)
                );
                setIsEditModalVisible(false);
                setEditingMessage(null);
            } else {
                AntMessage.error("Failed to update message.");
            }
        } catch (error) {
            console.error('Update request failed:', error);
            AntMessage.error("An error occurred while updating.");
        }
    };

    return (
        <Space direction="vertical" className="tableMessages">
            <Typography.Title level={4}>Messages</Typography.Title>
            <Table
                columns={[
                    {
                        title: "User First Name",
                        dataIndex: "firstName"
                    },
                    {
                        title: "User Last Name",
                        dataIndex: "lastName"
                    },
                    {
                        title: "User Email",
                        dataIndex: "email"
                    },
                    {
                        title: "Phone Number",
                        dataIndex: "telephone"
                    },
                    {
                        title: "Message",
                        dataIndex: "message"
                    },
                    {
                        title: "Actions",
                        render: (text, record) => (
                            <Space>
                                <DeleteOutlined
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleDelete(record.id)}
                                />
                                <EditOutlined
                                    style={{ color: 'blue', cursor: 'pointer' }}
                                    onClick={() => handleEdit(record)}
                                />
                            </Space>
                        )
                    },
                ]}
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                loading={loading}
            />

            {/* Edit Message Modal */}
            <Modal
                title="Edit Message"
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleUpdate}>
                        Update
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'First name is required' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Last name is required' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="telephone" rules={[{ required: true, message: 'Phone number is required' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Message is required' }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </Space>
    );
}

export default Messages;
