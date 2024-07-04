import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './leaveupdate.css'

function UpdateSpecialLeaving(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
      s_name:"",
      s_email:"",
      s_position:"",
      s_number:"",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/special/order_special/${id}`);
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
          const response = await fetch(`http://localhost:5000/special/update_special`, {
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
           alert("Special Leaving updated successfully");

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
<label>Name:</label>
                <input type="text" id="s_name" name="s_name"    onChange={handleInputChange} value={updateorder?.s_name }/><br/>
               
                <label>Email:</label>
                <input type="text" id="s_email" name="s_email"     onChange={handleInputChange} value={updateorder?.s_email }/>
              
                <label>Postion:</label>
                <input type="text" id="s_position" name="s_position"     onChange={handleInputChange} value={updateorder?.s_position }/><br/>
                
                <label>Number od Leave dates:</label>
                <input type="text" id="s_number" name="s_number"     onChange={handleInputChange} value={updateorder?.s_number }/><br/>


    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 


        </div>
    )
}
export default UpdateSpecialLeaving;