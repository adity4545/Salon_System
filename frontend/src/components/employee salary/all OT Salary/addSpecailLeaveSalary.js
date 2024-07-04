import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './addSpecialSalaryLeave.css'; // Import custom CSS for this component

export default function AddSpecialSalary() {

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");
    const [noOFleavingdates, setNoOFLeavingdates] = useState("");
    const [leavingNetnetSalary, setLeavingNetnetSalary] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        calculateLeavingNetSalary();
    }, [salary, noOFleavingdates]);

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

    const calculateLeavingNetSalary = () => {
        const amountPerHoliday = 100;
        const netSalary = parseInt(salary, 10) - (amountPerHoliday * parseInt(noOFleavingdates, 10));
        setLeavingNetnetSalary(netSalary);
    };

    function sendData(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newSpecialLeavingSalaries = {
            name,
            position,
            email,
            salary: salary,
            noOFleavingdates: noOFleavingdates,
            leavingNetnetSalary: leavingNetnetSalary
        }

        axios.post("http://localhost:5000/employee/addSpecialLeavingSalary", newSpecialLeavingSalaries)
            .then(() => {
                alert("Employee Special Added")
                setName("");
                setPosition("");
                setEmail("");
                setSalary("");
                setNoOFLeavingdates("");
                setLeavingNetnetSalary("");
            }).catch((err) => {
                alert(err)
            })
    }

    return (
        <div className="addspecialsalaryleave-container">
            <h1>Add Special Salary</h1>
            <form onSubmit={sendData} className="addspecialsalaryleave-form">
                <div className="form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
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
                    <label htmlFor="noOFleavingdates">No of Leaving dates</label>
                    <input type="text" className="form-control" id="noOFleavingdates" placeholder="No of Leaving dates" value={noOFleavingdates} onChange={(e) => setNoOFLeavingdates(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="leavingNetSalary">Net Salary (LKR.)</label>
                    <input type="text" className="form-control" id="leavingNetSalary" placeholder="Net Salary" value={leavingNetnetSalary} readOnly />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link to='/allSpecialsalaries'><button className="btn btn-info">Go Back All OT Salary</button></Link>
        </div>
    );
}
