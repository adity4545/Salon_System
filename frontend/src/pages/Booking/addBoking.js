import { useState } from "react";
import axios from "axios";
import './addBoking.css'

function AddBooking() {
    const [Booking, setBooking] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        message: "",
    });

    const [errors, setErrors] = useState({}); // State to store validation errors

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        let errorMessage = '';

        // Clear previous error message
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));

        // Validate phone number
        if (name === 'phone' && !/^\d+$/.test(value)) {
            errorMessage = 'Invalid phone number';
        }

        // Validate email
        if (name === 'email' && value !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errorMessage = 'Invalid email format';
            }
        }

        // Set error message if validation failed
        if (errorMessage !== '') {
            setErrors(prev => ({
                ...prev,
                [name]: errorMessage
            }));
        }

        // Update state with new value
        setBooking(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If there are validation errors, prevent form submission
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }

        // Submit the form
        try {
            const data = await axios.post("http://localhost:5000/create", Booking);
            console.log(data);
            alert("Booking successful!");
        } catch (error) {
            console.error('Failed to book:', error);
            alert("Failed to book!");
        }
    };

    return (
        <div className="add-Booking" style={{width:"800px"}}>
            <h2 style={{fontWeight:"bold",color:"#6b3b15"}}>Online Booking Form</h2>
            <form onSubmit={handleSubmit} >
                <label style={{fontSize:"14px"}}>Name:</label>
                <input type="text" id="name" name="name" onChange={handleOnChange} required/><br/>
                <label style={{fontSize:"14px"}}>Contact Number:</label>
                <input type="text" id="phone" name="phone" onChange={handleOnChange}/><br/>
                {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}<br/>
                <label style={{fontSize:"14px"}}>Email:</label>
                <input type="text" id="email" name="email" onChange={handleOnChange}/><br/>
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}<br/>
                <label style={{fontSize:"14px"}}>Service:</label>
                <select id="service" name="service" onChange={handleOnChange}>
                    <option>Hair</option>
                    <option>Skin</option>
                    <option>Nails</option>
                </select><br/>
                <label style={{fontSize:"14px"}}>Preferred Date & Time:</label>
                <input type="date" id="date" name="date" onChange={handleOnChange}/><br/>
                <label style={{fontSize:"14px"}}>Message:</label>
                <textarea id="message" name="message" onChange={handleOnChange}></textarea><br/>

                <button id="btnordr">Book Now</button>
            </form><br/>
        </div>
    );
}

export default AddBooking;
