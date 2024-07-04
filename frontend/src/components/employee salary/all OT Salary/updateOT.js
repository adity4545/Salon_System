import React, { useEffect, useState } from "react";
import './updateSalary.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateOT() {
    const { id } = useParams();
    const [otSalaries, setOtSalaries] = useState({
        id: id,
        name: '',
        position: '',
        email: '',
        gender: '',
        salary: '',
        noOFOThours: '',
        oTnetSalary: ''
    });

    useEffect(() => {
        const fetchOtSalaries = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/employee/getOT/${id}`);
                const data = await response.data;
                setOtSalaries(data.otSalaries);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchOtSalaries();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOtSalaries(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === "noOFOThours") {
            const oTnetSalary = parseFloat(otSalaries.salary) + (otSalaries.salary / 160) * value * 1.5; // Assuming 1.5 times the salary for OT
            setOtSalaries(prevState => ({
                ...prevState,
                oTnetSalary: oTnetSalary
            }));
        }
    };

    const navigate = useNavigate();
    const handleSubmit = () => {
        axios.put(`http://localhost:5000/employee/updateOt/${id}`, otSalaries)
            .then(res => {
                navigate('/dashboard');
            })
            .catch(err => {
                console.error('Error:', err);
            });
    };

    return (
        <div className="custom-update-container">
            <div className="custom-form-container">
                <div className="custom-form-header"  style={{paddingLeft: "250px", paddingRight: "250px"}}>
                    <h4 style={{fontWeight: "bold", fontSize:"20px"}}>Update OT Details</h4>
                    <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Employee Image" className="custom-employee-image"  style={{border: "1px solid black", width: "200px"}}/>
                </div>
                <form>
                    <div className="custom-form-group">
                        <label htmlFor="name" style={{fontWeight: "bold", fontSize:"15px"}}>Full Name</label>
                        <input type="text" className="custom-form-control" id="name" name="name" value={otSalaries.name} onChange={handleChange} />
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="position" style={{fontWeight: "bold", fontSize:"15px"}}>Position</label>
                        <input type="text" className="custom-form-control" id="position" name="position" value={otSalaries.position} onChange={handleChange} />
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="email" style={{fontWeight: "bold", fontSize:"15px"}}>Email</label>
                        <input type="email" className="custom-form-control" id="email" name="email" value={otSalaries.email} onChange={handleChange} />
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="salary" style={{fontWeight: "bold", fontSize:"15px"}}>Salary ($)</label>
                        <input type="number" className="custom-form-control" id="salary" name="salary" value={otSalaries.salary} onChange={handleChange} />
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="noOFOThours" style={{fontWeight: "bold", fontSize:"15px"}}>No of Hours</label>
                        <input type="number" className="custom-form-control" id="noOFOThours" name="noOFOThours" value={otSalaries.noOFOThours} onChange={handleChange} />
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="netSalary" style={{fontWeight: "bold", fontSize:"15px"}}>Net Salary ($)</label>
                        <input type="text" className="custom-form-control" id="netSalary" name="netSalary" value={otSalaries.oTnetSalary} readOnly />
                    </div>
                    <button type="button" className="custom-btn-primary" onClick={handleSubmit}>Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateOT;
