import { useState } from "react";
import axios from "axios";
import './addleave.css';

function AddSpecialLeaving() {
    const [order, setOrder] = useState({
        s_name:"",
        s_email:"",
        s_position:"",
        s_number:"",
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
        if (!validateEmail(order.s_email)) {
            setErrors({ ...errors, email: 'Invalid email format' });
            return; // Prevent form submission if email is invalid
        }

        // If no errors, submit the form
        try {
            const data = await axios.post("http://localhost:5000/special/create_special", order);
            console.log(data);
            alert("Special Leaving Details added!");
        } catch (error) {
            console.error('Failed to add details:', error);
            alert("Failed to add details!");
        }
    };

    return (
        <div className="add-order">
            <h2>Special Leaving Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" id="s_name" name="s_name" onChange={handleOnChange}/><br/>
                {/* <label>Id:</label>
                <input type="text" id="l_id" name="l_id" onChange={handleOnChange}/><br/> */}
                <label>Email:</label>
                <input type="text" id="s_email" name="s_email" onChange={handleOnChange}/>
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}<br/>
                <label>Postion:</label>
                <input type="text" id="s_position" name="s_position" onChange={handleOnChange}/><br/>
                
                <label>Number od Leave dates:</label>
                <input type="text" id="s_number" name="s_number" onChange={handleOnChange}/><br/>

                <button id="lbtn">Add Details</button>
            </form><br/>
        </div>
    );
}

export default AddSpecialLeaving;
