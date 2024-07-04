import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../all OT Salary/addSpecialSalaryLeave.css'; // Import custom CSS for styling

export default function AddOTSalary() {

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");
    const [noOFOThours, setNoOFOThours] = useState("");
    const [oTnetSalary, setOTnetSalary] = useState(0);
    const [errors, setErrors] = useState({});

    function validateForm() {
        let isValid = true;
        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!position.trim()) {
            errors.position = "Position is required";
            isValid = false;
        }

        if (!email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        if (!salary.trim()) {
            errors.salary = "Salary is required";
            isValid = false;
        } else if (isNaN(Number(salary))) {
            errors.salary = "Salary must be a number";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    const calculateOTSalary = (hours) => {
        const parsedSalary = parseFloat(salary);
        const parsedHours = parseFloat(hours);
        
        if (isNaN(parsedSalary) || isNaN(parsedHours)) {
            setOTnetSalary(0);
            return;
        }
        
        const overtimeRate = 1.5;
        const otSalary = parsedSalary * overtimeRate * parsedHours;
        setOTnetSalary(otSalary);
    }

    function handleNoOFOThoursChange(e) {
        const hours = e.target.value;
        setNoOFOThours(hours);
        calculateOTSalary(hours);
    }

    function sendData(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newotSalaries = {
            name,
            position,
            email,
            salary: salary,
            noOFOThours: noOFOThours,
            oTnetSalary: oTnetSalary
        }

        axios.post("http://localhost:5000/employee/addOTSalary", newotSalaries)
            .then(() => {
                alert("Employee OT Added");
                setName("");
                setPosition("");
                setEmail("");
                setSalary("");
                setNoOFOThours("");
                setOTnetSalary(0);
            }).catch((err) => {
                alert(err)
            })
    }

    return (
        <div className="addspecialsalaryleave-container" style={{backgroundColor: "#F7C8BB" }}>
            <h1 style={{paddingBottom:"20px", fontWeight:"bold"}}>Add OT Salary</h1>
            <form onSubmit={sendData} className="addspecialsalaryleave-form" style={{paddingLeft:"20px", paddingRight:"20px"}}>
                <div className="form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width:"500px"}} />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="position">Employee Position</label>
                    <input type="text" className="form-control" id="position" placeholder="Enter Position" value={position} onChange={(e) => setPosition(e.target.value)} />
                    {errors.position && <div className="text-danger">{errors.position}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary (LKR.)</label>
                    <input type="text" className="form-control" id="salary" placeholder="Enter Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    {errors.salary && <div className="text-danger">{errors.salary}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="noOFOThours">No of OT Hours</label>
                    <input type="text" className="form-control" id="noOFOThours" placeholder="No of OT Hours" value={noOFOThours} onChange={handleNoOFOThoursChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="oTnetSalary">Net Salary (LKR.)</label>
                    <input type="text" className="form-control" id="oTnetSalary" placeholder="Net Salary" value={oTnetSalary} readOnly />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link to='/allOTsalaries'><button className="btn btn-info">Go Back All OT Salary</button></Link>
        </div>
    );
}
