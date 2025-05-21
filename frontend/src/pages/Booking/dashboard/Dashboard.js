import axios from "axios";
import Card from 'components/card/Card';
import { useEffect, useState } from 'react';
import './Dashboard.css';

function OrderReport(){
    const [countlist,setcountlist]=useState([]);
    const [customerlist,setcustomerlist]=useState([]);

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:5000/count")
   const { count } = data.data;
   setcountlist(count);//get count
   setcustomerlist(data.data.data);//get table data
 
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])

return(
    <div className="dashboardWrapper">
        <Card cardClass="dashboardCard">
            <h3>Total Booking</h3>
            {countlist !== null ? (
                <p className="bookingCount">{countlist}</p>
            ) : (
                <p>Loading...</p>
            )}
        </Card>
        <Card cardClass="dashboardCard">
            <h3>Summary Of Booking System</h3>
            <div className="tableWrapper">
                <table className="dashboardTable">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerlist.map((e, idx) => (
                            <tr key={idx}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
)
}
export default OrderReport;