import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function ServiceUpdateForm() {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [errors, setErrors] = useState({
        s_duration: "",
        s_price: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/services/getservice/${id}`);
                const data = await res.json();
                if (res.status === 422 || !data) {
                    console.log("error");
                } else {
                    setService(data);
                    console.log("Get Data");
                }
            } catch (error) {
                console.error("Error fetching service details:", error);
            }
        };

        fetchData();
    }, [id]);

    const [formData, setFormData] = useState({
        s_name: "",
        s_desc: "",
        s_duration: "",
        s_price: "",
    });

    useEffect(() => {
        if (service) {
            setFormData({
                s_name: service.s_name,
                s_desc: service.s_desc,
                s_duration: service.s_duration,
                s_price: service.s_price,
            });
        }
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Validate duration format
        if (name === "s_duration") {
            const durationRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]h$/;
            if (!durationRegex.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    s_duration: "Duration format should be in the format 00:00h",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    s_duration: "",
                }));
            }
        }

        // Validate price format
        if (name === "s_price") {
            const priceRegex = /^Rs\.\d+(\.\d{2})?$/;
            if (!priceRegex.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    s_price: "Price format should be in the format Rs.2000.00",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    s_price: "",
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to update this service?");
        if (isConfirmed) {
            // Check if there are any validation errors
            if (errors.s_duration || errors.s_price) {
                alert("Please fix the validation errors before submitting.");
                return;
            }
            try {
                const res = await fetch(`http://localhost:5000/services/updateservice/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                console.log(data); // Updated service data
                // Handle success or display a message
            } catch (error) {
                console.error("Error updating service:", error);
                // Handle error or display an error message
            }
        }
    };

    return (
        <div className="sbox1">
            <div className="sbox2">
                <h2>Update Service</h2>
                <form  onSubmit={handleSubmit}>
                    <div >
                        <label htmlFor="s_name">Service Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="s_name"
                            name="s_name"
                            placeholder="Service Name"
                            value={formData.s_name}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div >
                        <label htmlFor="s_desc">Service Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="s_desc"
                            name="s_desc"
                            placeholder="Service Description"
                            value={formData.s_desc}
                            onChange={handleChange}
                        />
                    </div>
                    <div >
                        <label htmlFor="s_duration">Service Duration:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.s_duration ? "is-invalid" : ""}`}
                            id="s_duration"
                            name="s_duration"
                            placeholder="Service Duration"
                            value={formData.s_duration}
                            onChange={handleChange}
                        />
                        {errors.s_duration && <div className="invalid-feedback">{errors.s_duration}</div>}
                    </div>
                    <div >
                        <label htmlFor="s_price">Service Price:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.s_price ? "is-invalid" : ""}`}
                            id="s_price"
                            name="s_price"
                            placeholder="Service Price"
                            value={formData.s_price}
                            onChange={handleChange}
                        />
                        {errors.s_price && <div className="invalid-feedback">{errors.s_price}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary " style={{marginBottom: '20px'}}>Update Service</button>
                </form>
            </div>
        </div>
    );
}
