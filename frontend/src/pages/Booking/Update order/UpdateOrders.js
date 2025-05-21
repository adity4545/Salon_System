import Card from 'components/card/Card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateOrder.css';

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
        <div className="updateOrderWrapper">
            <Card cardClass="updateOrderCard">
                <h2 className="title">Update Details</h2>
                <form className="updateForm" onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={handleInputChange} value={updateorder?.name} />

                    <label htmlFor="phone">Contact Number:</label>
                    <input type="text" id="phone" name="phone" onChange={handleInputChange} value={updateorder?.phone} />

                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" onChange={handleInputChange} value={updateorder?.email} />

                    <label htmlFor="service">Service:</label>
                    <select id="service" name="service" onChange={handleInputChange} value={updateorder?.service}>
                        <option value="">Select Service</option>
                        <option value="Hair">Hair</option>
                        <option value="Skin">Skin</option>
                        <option value="Nails">Nails</option>
                    </select>

                    <label htmlFor="date">Preferred Date & Time:</label>
                    <input type="date" id="date" name="date" onChange={handleInputChange} value={updateorder?.date} />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" onChange={handleInputChange} value={updateorder?.message}></textarea>

                    <button type="submit" className="updateButton">Update</button>
                </form>
            </Card>
        </div>
    )
}
export default UpdateOrder;