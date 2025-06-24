import './index.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Typography, Space, Modal, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { notify } from '../../Helpers/notify';
import { ToastContainer } from 'react-toastify';

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [updating, setUpdating] = useState(false);

  // Fetch users data
  const getUsers = async () => {
    const response = await fetch('https://gskibyagira-backend.onrender.com/api/users/users', {
      method: 'GET',
    });
    const json = await response.json();

    // Set a unique key for each user (e.g., use id or index as key)
    const usersWithKey = json.data.map((user, index) => ({
      ...user,
      key: user.id  
    }));

    setDataSource(usersWithKey);
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    setLoading(false);
  }, []);

  // Handle edit button click
  const handleEdit = (key) => {
    // Find the user by their unique key
    const user = dataSource.find(user => user.key === key);

    if (user) {
      // Set the form fields with the current user data
      form.setFieldsValue({
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.role,
        email: user.email,
      });

      setEditingUser(user);  // Store the current user being edited
      setIsModalVisible(true);  // Show the modal
    }
  };

  // Handle modal form submission
  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const updatedUser = await form.validateFields(); // Validate and get form values

      // Send updated data to server
      const response = await fetch(`https://gskibyagira-backend.onrender.com/api/users/users/${editingUser.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const message = "The user is updated successfully";
          toast.success(message, {
              style: { backgroundColor: "green", color: "white" },
            });
        // Update the table data after successful update
        setDataSource((prev) =>
          prev.map(user => (user.key === editingUser.key ? { ...user, ...updatedUser } : user))
        );
        setUpdating(false);
        setIsModalVisible(false); // Close the modal
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
//function to delete a user
const handleDelete = (key) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: async () => {
        try {
          // Send delete request to the server
          const response = await fetch(`https://gskibyagira-backend.onrender.com/api/users/users/${key}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            const message = "The user is deleted successfully";
            notify(message);
            // If the request is successful, filter out the deleted user from the dataSource
            setDataSource((prevDataSource) => prevDataSource.filter(user => user.key !== key));
          } else {
            console.error('Failed to delete user');
          }
        } catch (error) {
          console.error('Delete failed:', error);
        }
      },
      onCancel() {
        console.log('Deletion canceled');
      },
    });
  };
  
  

  const handleCancel = () => {
    setIsModalVisible(false); // Close modal without saving
  };

  return (
    <div className="table-container">
      <Space direction="vertical" size={20} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
        <Typography.Title level={4} style={{ textAlign: 'center' }}>Users</Typography.Title>
        <Table
  className="custom-table"
  loading={loading}
  columns={[
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Role", dataIndex: "role" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Actions",
      render: (text, record) => (
        <span className='user_actions'>
          <FaTrash className='delete-btn' onClick={() => handleDelete(record.key)} />
          <FaPencilAlt className='edit-btn' onClick={() => handleEdit(record.key)} />
        </span>
      )
    }
  ]}
  dataSource={dataSource}
  pagination={{ pageSize: 7 }}
  scroll={{ x: "max-content" }} // Enables horizontal scrolling
/>

      </Space>

      {/* Modal for editing user */}
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button disabled={updating} key="submit" type="primary" onClick={handleUpdate}>
            {updating ? "Updating..." : "Update"}
          </Button>
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input the first name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input the last name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please input the role!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer position='top-center'/>
    </div>
  );
}

export default Users;
