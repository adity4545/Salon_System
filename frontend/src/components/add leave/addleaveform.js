import { useState } from "react";
import axios from "axios";
import './addleave.css';

function AddLeaving() {
    const [order, setOrder] = useState({
        name: "",
        l_id: "",
        email: '',
        leave_time: "",
        post: "",
        reason: ""
    });

    const [errors, setErrors] = useState({}); // State for storing validation errors

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear errors when the user modifies their input
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email before submitting
        if (!validateEmail(order.email)) {
            setErrors({ ...errors, email: 'Invalid email format' });
            return; // Prevent form submission if email is invalid
        }

        // If no errors, submit the form
        try {
            const data = await axios.post("http://localhost:5000/leaving/create", order);
            console.log(data);
            alert("Details added!");
        } catch (error) {
            console.error('Failed to add details:', error);
            alert("Failed to add details!");
        }
    };

    return (
        <div className="add-order" style={{width:"700px", backgroundColor:"#F7C8BB"}}>
            <h2 style={{fontWeight:"bold"}}>Leaving Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" id="name" name="name" onChange={handleOnChange}/><br/>
                {/* <label>Id:</label>
                <input type="text" id="l_id" name="l_id" onChange={handleOnChange}/><br/> */}
                <label>Email:</label>
                <input type="text" id="email" name="email" onChange={handleOnChange}/>
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}<br/>
                <label>Leave Time:</label>
                <input type="time" id="leave_time" name="leave_time" onChange={handleOnChange}/><br/>
                <label>Post:</label>
                <input type="text" id="post" name="post" onChange={handleOnChange}/><br/>
                <label>Reason:</label>
                <input type="text" id="reason" name="reason" onChange={handleOnChange}/><br/>

                <button id="lbtn">Add Details</button>
            </form><br/>
        </div>
    );
}

export default AddLeaving;
