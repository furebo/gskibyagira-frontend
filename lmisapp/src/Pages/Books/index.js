import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Typography, Space, Modal, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { ToastContainer } from "react-toastify";
import './index.css';

function Books() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form] = Form.useForm();

  // Fetch books data
  const getBooks = async () => {
    try {
      const response = await fetch('https://gskibyagira-backend.onrender.com/api/books/books', {
        method: 'GET',
      });
      const json = await response.json();

      if (json && json.data) {
        const booksWithKey = json.data.map((book) => ({
          ...book,
          key: book.id,
        }));
        setDataSource(booksWithKey);
      } else {
        toast.info('No data found in the response', {
          style: { backgroundColor: "red", color: "white" },
        });
      }
    } catch (error) {
      toast.info('Failed to fetch the book', {
        style: { backgroundColor: "red", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);

  const { confirm } = Modal;

  // Handle delete book
  const handleDelete = (key) => {
    confirm({
      title: 'Are you sure you want to delete this book?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete it',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk: async () => {
        try {
          const response = await fetch(`https://gskibyagira-backend.onrender.com/api/books/books/${key}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            setDataSource((prevDataSource) => prevDataSource.filter((book) => book.key !== key));
            
            toast.success("The Book Deleted Successfully", {
              style: { backgroundColor: "green", color: "white" },
            });
          } else {
            
            toast.info("Failed to delete the book", {
              style: { backgroundColor: "red", color: "white" },
            });
          }
        } catch (error) {
          toast.info("The Book Deletion Failed", {
            style: { backgroundColor: "red", color: "white" },
          });
        }
      },
      onCancel() {
        toast.info("The Book Deletion Cancelled", {
          style: { backgroundColor: "red", color: "white" },
        });
      },
    });
  };

  // Handle edit book
  const handleEdit = (key) => {
    // Find the book to edit
    const bookToEdit = dataSource.find((book) => book.key === key);
    if (bookToEdit) {
      // Set the form fields with the current book data
      form.setFieldsValue({
        booktype: bookToEdit.booktype,
        booklevel: bookToEdit.booklevel,
        bookcode: bookToEdit.bookcode,
        bookauthor: bookToEdit.bookauthor,
        deliverydate: bookToEdit.deliverydate,
      });
      setEditingBook(bookToEdit);
      setIsModalVisible(true); // Show modal
    }
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      const updatedBook = await form.validateFields(); // Validate and get form values

      // Send updated data to server
      const response = await fetch(`https://gskibyagira-backend.onrender.com/api/books/books/${editingBook.key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        // Update the table data after successful update
        setDataSource((prev) =>
          prev.map((book) => (book.key === editingBook.key ? { ...book, ...updatedBook } : book))
        );
        setIsModalVisible(false); // Close the modal
        toast.success("The Book Updated Successfully.", {
          style: { backgroundColor: "green", color: "white" },
        });
      } else {
        toast.info("There is an error updating the book", {
          style: { backgroundColor: "red", color: "white" },
        });
      }
    } catch (error) {
       toast.info("There is an error updating the book", {
            style: { backgroundColor: "red", color: "white" },
          });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close modal without saving
  };

  return (
    <div className="table-container">
      <Space direction="vertical" size={20} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
        <Typography.Title level={4}>Books</Typography.Title>
        <Table className="book_table"
          loading={loading}
          columns={[
            { title: "Book Type", dataIndex: "booktype" },
            { title: "Book Level", dataIndex: "booklevel" },
            { title: "Book Code", dataIndex: "bookcode" },
            { title: "Book Author", dataIndex: "bookauthor" },
            { title: "Delivery Date", dataIndex: "deliverydate" },
            {
              title: "Actions",
              render: (text, record) => (
                <span className="user_actions">
                  <FaTrash className="delete-btn" onClick={() => handleDelete(record.key)} />
                  <FaPencilAlt className="edit-btn" onClick={() => handleEdit(record.key)} />
                </span>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{ pageSize: 6 }}
        />
      </Space>

      {/* Modal for editing book */}
      <Modal
        title="Edit Book"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdate}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="booktype" label="Book Type" rules={[{ required: true, message: 'Please input the book type!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="booklevel" label="Book Level" rules={[{ required: true, message: 'Please input the book level!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="bookcode" label="Book Code" rules={[{ required: true, message: 'Please input the book code!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="bookauthor" label="Book Author" rules={[{ required: true, message: 'Please input the book author!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="deliverydate" label="Delivery Date" rules={[{ required: true, message: 'Please input the delivery date!' }]}>
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Books;
