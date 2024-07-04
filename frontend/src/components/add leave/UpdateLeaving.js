import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './leaveupdate.css'

function UpdateLeaving(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
      name:"",
      l_id:"",
      email:'',
      leave_time:"",
      post:"",
      reason:""
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/leaving/order/${id}`);
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
          const response = await fetch(`http://localhost:5000/leaving/update`, {
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
            console.log('Leave updated successfully');
           alert("Leave updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='order-update1'>

<h2> Update Details</h2><br></br>

    <lable>Name:</lable>
    <input type="text" id="name" name="name"  onChange={handleInputChange} value={updateorder?.name }/><br></br><br></br> <br></br> 
    <lable>Id:</lable>
    <input type="text" id="l_id" name="l_id" onChange={handleInputChange} value={updateorder?.l_id }/><br></br><br></br> <br></br> 
    <lable>Email:</lable>
    <input type="text" id="email" name="email" onChange={handleInputChange} value={updateorder?.email }/><br></br> <br></br> <br></br> 
    <lable>leave_time:</lable>
    <input type="time" id="leave_time" name="leave_time" onChange={handleInputChange} value={updateorder?.leave_time }/><br></br> 
    <lable>Post:</lable>
    <input type="text" id="post" name="post" onChange={handleInputChange} value={updateorder?.post }/><br></br> 
    <lable>Reason:</lable>
    <input type="text" id="reason" name="reason" onChange={handleInputChange} value={updateorder?.reason }/><br></br> 

    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 
  

        </div>
    )
}
export default UpdateLeaving;