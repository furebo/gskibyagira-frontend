import { Card, Space, Statistic, Table, Typography } from "antd";
import {BookOutlined,MessageOutlined,UserOutlined,CalendarOutlined} from '@ant-design/icons'
import { useEffect, useState } from "react";
import { getOrder, getRevenues } from "../../API";

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
    return(
        <Space size={20} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
            <AdminDashboardCard icon={<UserOutlined style={
            {
            color:"purple",
            backgroundColor:"rgba(0,255,255,0.5)",
            borderRadius:12,
            fontSize:24,
            padding:8                
            }} />} title={"Users"} value={12546}/>
            <AdminDashboardCard icon={<BookOutlined style={
            {
            color:"green",
            backgroundColor:"rgba(0,255,0,0.5)",
            borderRadius:12,
            fontSize:24,
            padding:8                
            }} />} title={"Books"} value={10546}/>
            <AdminDashboardCard icon={<MessageOutlined style={
            {
            color:"blue",
            backgroundColor:"rgba(0,0,255,0.5)",
            borderRadius:12,
            fontSize:24,
            padding:8                
            }} />} title={"Messages"} value={17546}/>
            <AdminDashboardCard icon={<CalendarOutlined style={
            {
            color:"red",
            backgroundColor:"rgba(255,0,0,0.5)",
            borderRadius:12,
            fontSize:24,
            padding:8                
            }} />} title={"Events"} value={19546}/>
        </Space>
        <Space>
            <RecentOrders />
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

function RecentOrders(){
    const [dataSource,setDataSource] = useState([]);
    const [loading,setlLoading] = useState(false)
    
    useEffect(()=>{
     setlLoading(true)
     getOrder().then((res)=>{
        setDataSource(res.products.splice(0,3))
        setlLoading(false)
     })
    },[])
    return (
    <>
    <Typography.Text>Recent Orders</Typography.Text>
    <Table columns={[
        {
        title:'Title',
        dataIndex:'title'
       },
       {
        title:'Quantity',
        dataIndex:'quantity'
       },
       {
        title:'Price',
        dataIndex:'discountedPrice'
       },
]} 
dataSource={dataSource}
loading={loading}
pagination={false}
>
</Table>
</>
)
}

function DashboardChart(){
    const[revenueData,setRevenueData] = useState({
        labels:[],
        datasets:[]
    })
    useEffect(
        ()=>{
            getRevenues().then((res)=>{
                const labels = res.products.map((product)=>{
                return `Product-${product.id}`
               });
               const data = res.products.map((product)=>{
                return product.price
               });
               const dataSource = {
                labels,
                datasets:[
                    {
                        label:'Revenue',
                        data:data,
                        backgroundColor:"rgba(255,0,0,0.5)"
                    }
                ]
            }
            setRevenueData(dataSource);
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
               text:"Chart for Order Revenue"
            }
        }
    }

    return <Card style={{width:500,height:250}}>
               <Bar options={options} data={revenueData} />
           </Card>
}