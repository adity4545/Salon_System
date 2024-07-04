import "./ServiceAdd.css";
import React, { useState } from "react";

export default function ServiceAdd() {
    const [inputVal, setInputVal] = useState({
        s_name: "",
        s_desc: "",
        s_duration: "",
        s_price: "",
    });

    const [errors, setErrors] = useState({
        s_duration: "",
        s_price: "",
    });

    const setDate = (e) => {
        const { name, value } = e.target;
        setInputVal(prevVal => ({
            ...prevVal,
            [name]: value
        }));

        // Real-time validation for duration
        if (name === "s_duration") {
            const timeValid = validateTime(value);
            setErrors(prevErrors => ({
                ...prevErrors,
                s_duration: timeValid ? "" : "Invalid time format(00:00h)",
            }));
        }

        // Real-time validation for price
        if (name === "s_price") {
            const priceValid = validatePrice(value);
            setErrors(prevErrors => ({
                ...prevErrors,
                s_price: priceValid ? "" : "Invalid price format(Rs.1000.00)",
            }));
        }
    };

    const ServiceAdd = async (e) => {
        e.preventDefault();

        const { s_name, s_desc, s_duration, s_price } = inputVal;

        // Validation for empty fields
        if (!s_name || !s_desc || !s_duration || !s_price) {
            alert("Please fill all the fields");
            return;
        }

        // Validation for time format
        if (errors.s_duration) {
            alert("Please fix the time format error");
            return;
        }

        // Validation for price format
        if (errors.s_price) {
            alert("Please fix the price format error");
            return;
        }

        const res = await fetch("http://localhost:5000/services/addservice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                s_name, s_desc, s_duration, s_price
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert("error");
            console.log("error");
        } else {
            alert("data added");
            console.log("Data Added");
        }
    }

    // Validation for time format
    const validateTime = (time) => {
        const regex = /^(2[0-3]|[01]?[0-9]):[0-5][0-9]h$/;
        return regex.test(time);
    };

    // Validation for price format
    const validatePrice = (price) => {
        const regex = /^Rs\.\d+\.\d{2}$/;
        return regex.test(price);
    };

    return (
        <div className="sbox1" >
            <div className="sbox2">
                <h2>Add Service</h2>
                <form className="mx-auto">
                    <div className="mb-3">
                        <label htmlFor="s_name">Service Name:</label>
                        <input type="text" className="form-control" id="s_name"
                            placeholder="Service Name" name="s_name" onChange={setDate} value={inputVal.s_name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="s_desc">Service Description:</label>
                        <input type="text" className="form-control" id="s_desc"
                            placeholder="Service Description" name="s_desc" onChange={setDate} value={inputVal.s_desc} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="s_duration">Service Duration:</label>
                        <input type="text" className={`form-control ${errors.s_duration ? "is-invalid" : ""}`} id="s_duration"
                            placeholder="Service Duration" name="s_duration" onChange={setDate} value={inputVal.s_duration} />
                        {errors.s_duration && <div className="invalid-feedback">{errors.s_duration}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="s_price">Service Price:</label>
                        <input type="text" className={`form-control ${errors.s_price ? "is-invalid" : ""}`} id="s_price"
                            placeholder="Service Price" name="s_price" onChange={setDate} value={inputVal.s_price} />
                        {errors.s_price && <div className="invalid-feedback">{errors.s_price}</div>}
                    </div>
                    <div className="text-center" style={{ marginBottom: '20px'}}> 
                        <button className="btn btn-primary" onClick={ServiceAdd}>Add Service</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
