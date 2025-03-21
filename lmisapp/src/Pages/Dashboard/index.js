import { Card, Space, Statistic, Table, Typography } from "antd";
import {BookOutlined,MessageOutlined,UserOutlined,CalendarOutlined} from '@ant-design/icons'
import { useEffect, useState } from "react";
import { getBorrowedBooksData } from "../../API";
import './index.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend

} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function AdminDashboard(){
    const [loading,setLoading] = useState(false);
    //lets create the states to hold the number of users,books,events and staffs
    const [users,setUsers] = useState(0);
    const [books,setBooks] = useState(0);
    const [events,setEvents] = useState(0);
    const [staffs,setStaffs] = useState(0);

    //function to fetch the books and update the state
    const getBorrowedBooks = async () =>{
        let allBooksResponse = await fetch('https://gskibyagira-backend.onrender.com/api/books/books',{
                 method:'GET'
               })
               let json = await allBooksResponse.json();
               setBooks(json.data.length);
              }
    //function to fetch the users and update the state
    const getAllUsers = async () =>{
        let allUsersResponse = await fetch('https://gskibyagira-backend.onrender.com/api/users/users',{
                 method:'GET'
               })
               let json = await allUsersResponse.json();
               setUsers(json.data.length);
              }

    //function to fetch the Events and update the state
    const getAllEvents = async () =>{
        let allEventsResponse = await fetch('https://gskibyagira-backend.onrender.com/api/events/events',{
                 method:'GET'
               })
               let json = await allEventsResponse.json();
               setEvents(json.data.length);
              }
    //function to fetch the Staffs and update the state
    const getAllStaffs = async () =>{
        let allStaffResponse = await fetch('https://gskibyagira-backend.onrender.com/api/staffs/staffs',{
                 method:'GET'
               })
               let json = await allStaffResponse.json();
               setStaffs(json.data.length);
              }

    useEffect(()=>{
        setLoading(true);
        getBorrowedBooks();
        getAllUsers();
        getAllEvents();
        getAllStaffs();
        setLoading(false)
       },[])
    return(
        <Space size={20} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
        <div className="dashboardCard">
            <div className="dashboardCard_innerdiv">
            <AdminDashboardCard className="AdminDashboardCard"  icon={<UserOutlined style={
            {
            color:"purple",
            backgroundColor:"rgba(0,255,255,0.5)",
            borderRadius:12,
            fontSize:24,
            padding:8,                
            }} />} title={"Users"} value={users}/>
            <AdminDashboardCard icon={<BookOutlined style={
            {
            color:"green",
            backgroundColor:"rgba(0,255,0,0.5)",
            borderRadius:12,
            fontSize:24,
            padding:8                
            }} />} title={"Books"} value={books}/>
            </div>
            <div className="dashboardCard_innerdiv">
            <AdminDashboardCard icon={<MessageOutlined style={
            {
            color:"blue",
            backgroundColor:"rgba(0,0,255,0.5)",
            borderRadius:12,
            fontSize:24,
            padding:8                
            }} />} title={"Events"} value={events}/>
            
            <AdminDashboardCard icon={<CalendarOutlined style={
            {
            color:"red",
            backgroundColor:"rgba(255,0,0,0.5)",
            borderRadius:12,
            fontSize:24,
            padding:8                
            }} />} title={"Staffs"} value={staffs}/>
            </div>
            </div>
        </Space>
        <Space className="dashboardCard">
            <RecentBooks />
            <DashboardChart/>
        </Space>
        </Space>
    )
}
export default AdminDashboard;

function AdminDashboardCard({title,value,icon}){
    return(
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value}/>
            </Space>
        </Card>
    )
}


function RecentBooks() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    // Fetch recent borrowed books data from the API
    const fetchRecentBooks = async () => {
        setLoading(true); // Start loading
        try {
            let response = await fetch('https://gskibyagira-backend.onrender.com/api/books/books', {
                method: 'GET',
            });
            let json = await response.json();

            // Assuming the API returns an array of books
            const booksData = json.data.map((book) => ({
                bookType: book.bookType,
                bookLevel: book.bookLevel,
                bookCode: book.bookCode,
            }));

            setDataSource(booksData); // Set the data for the table
        } catch (error) {

        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchRecentBooks(); // Fetch books when component is mounted
    }, []);

    return (
        <>
            <Typography.Text>Recent Borrowed Books</Typography.Text>
            <Table
                columns={[
                    {
                        title: 'Book-Type',
                        dataIndex: 'bookType',
                    },
                    {
                        title: 'Book_Level',
                        dataIndex: 'bookLevel',
                    },
                    {
                        title: 'Book_Id',
                        dataIndex: 'bookCode',
                    },
                ]}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
            />
        </>
    );
}


function DashboardChart(){
    const[borrowedBooksData,setBorrowedBooksData] = useState({
        labels:[],
        datasets:[]
    })
    useEffect(
        ()=>{
            getBorrowedBooksData().then((res)=>{
                const labels = res.data.map((book)=>{
                return `Book-${book.Book_Type}`
               });
               const data = res.data.map((book)=>{
                return book.count;
               });
               const dataSource = {
                labels,
                datasets:[
                    {
                        label:'Book',
                        data:data,
                        backgroundColor:"rgba(255,0,0,0.5)"
                    }
                ]
            }
            setBorrowedBooksData(dataSource);
            })
        }
    )
    const options = {
        responsive:true,
        plugins:{
            legend:{
               position:'bottom'
            },
            title:{
               display:true,
               text:"Chart For Borrowed Book Type Quantity"
            }
        }
    }

    return <Card style={{width:500,height:250}}>
               <Bar options={options} data={borrowedBooksData} />
           </Card>
}