import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './orderupdate.css'

function UpdateOrder(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
      name:"",
      phone:"",
      email:"",
      service:"",
      date:"",
      message:"",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/book/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdateorder(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdateorder({
          ...updateorder,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:5000/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateorder._id,
              ...updateorder,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            console.log('Order updated successfully');
           alert("Order updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='order-update'>

<h2> Update Details</h2><br></br>
    <lable>Name:</lable>
    <input type="text" id="name" name="name" onChange={handleInputChange} value={updateorder?.name }/><br></br>
    <lable>Contact Number :</lable>
    <input type="text" id="phone" name="phone" onChange={handleInputChange} value={updateorder?.phone}/><br></br>
    <lable>Email:</lable>
    <input type="text" id="email" name="email" onChange={handleInputChange} value={updateorder?.email}/><br></br> 
    <lable>Service:</lable>
    <select id="service"  name="service" onChange={handleInputChange} value={updateorder?.service}>
        <option> Hair </option>
        <option> Skin </option>
        <option> Nails </option>
    </select><br></br> 
    <lable>Preferd Date & Time:</lable>
    <input type="date" id="date" name="date" onChange={handleInputChange} value={updateorder?.date}/><br></br> 
    <lable>Message:</lable>
    <textarea id="message" name="message" onChange={handleInputChange} value={updateorder?.message}></textarea><br></br> 
    
    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 
  
 
        </div>
    )
}
export default UpdateOrder;