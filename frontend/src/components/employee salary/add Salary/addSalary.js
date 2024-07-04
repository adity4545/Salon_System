import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../all OT Salary/addSpecialSalaryLeave.css'; // Import custom CSS for styling

export default function AddSalary() {

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [salary, setSalary] = useState("");
    const [tax, setTax] = useState(0);
    const [netSalary, setNetSalary] = useState(0);
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

        if (!gender.trim()) {
            errors.gender = "Gender is required";
            isValid = false;
        } else if (!/^[a-zA-Z]+$/.test(gender)) {
            errors.gender = "Gender must contain only letters";
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

    function handleSalaryChange(e) {
        const { value } = e.target;
        if (!isNaN(Number(value))) {
            setSalary(value);
            Calculation(value); // Recalculate whenever salary changes
        }
    }

    function sendData(e) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        alert("Insert");

        const newEmployeeSalaryDetails = {
            name,
            position,
            email,
            gender,
            salary: Number(salary),
            tax,
            netSalary,
        }

        axios.post("http://localhost:5000/employee/addSalary", newEmployeeSalaryDetails)
            .then(() => {
                alert("Employee Added")
                setName("");
                setPosition("");
                setEmail("");
                setGender("");
                setSalary("");
                setTax(0);
                setNetSalary(0);
            }).catch((err) => {
                alert(err)
            })
    }

    function Calculation(salaryValue) {
        let calculatedTax = 0;
        let calculatedNetSalary = 0;

        salaryValue = Number(salaryValue);

        if (isNaN(salaryValue)) {
            alert("Salary must be a valid number.");
            return;
        }

        if (salaryValue >= 25000) {
            calculatedTax = (salaryValue * 10) / 100;
        } else {
            calculatedTax = (salaryValue * 5) / 100;
        }

        setTax(calculatedTax);
        calculatedNetSalary = salaryValue - calculatedTax;
        setNetSalary(calculatedNetSalary);
    }

    return (
        <div className="addspecialsalaryleave-container" style={{backgroundColor: "#F7C8BB", border:"2px solid black"}}>
            <h1 style={{color: "black", paddingBottom:"15px", fontWeight:"bold"}}>Add Salary Details</h1>
            <form onSubmit={sendData} className="addspecialsalaryleave-form">
                <div className="form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} style={{border:"1px solid black"}}/>
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="position">Employee Position</label>
                    <input type="text" className="form-control" id="position" placeholder="Enter Position" value={position} onChange={(e) => setPosition(e.target.value)} style={{border:"1px solid black"}}/>
                    {errors.position && <div className="text-danger">{errors.position}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{border:"1px solid black"}}/>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input type="text" className="form-control" id="gender" placeholder="Enter Gender" value={gender} onChange={(e) => setGender(e.target.value)} style={{border:"1px solid black"}}/>
                    {errors.gender && <div className="text-danger">{errors.gender}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input type="text" className="form-control" id="salary" placeholder="Enter Salary" value={salary} onChange={handleSalaryChange} style={{border:"1px solid black"}}/>
                    {errors.salary && <div className="text-danger">{errors.salary}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="tax">Tax</label>
                    <input type="text" className="form-control" id="tax" placeholder="Tax" value={tax} readOnly style={{border:"1px solid black"}}/>
                </div>
                <div className="form-group">
                    <label htmlFor="netSalary">Net Salary</label>
                    <input type="text" className="form-control" id="netSalary" placeholder="Net Salary" value={netSalary} readOnly style={{border:"1px solid black"}}/>
                </div>
                <button type="submit" className="btn btn-primary">Add Employee Salary</button>
            </form>
            <Link to='/allSpecialsalaries'><button className="btn btn-info">Go Back All OT Salary</button></Link>
        </div>
    );
}
