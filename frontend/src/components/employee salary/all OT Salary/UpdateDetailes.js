import React, { useEffect, useState } from "react";
import './updateSalary.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update(){

    const {id} = useParams();
    const [employeeSalaryDetails, setEmployeeSalaryDetails] = useState({
        id: id,
        name:'',
        position:'',
        email:'',
        gender:'',
        salary:'',
        tax:'',
        netSalary:''
    });

    useEffect(() => {
        const fetchEmployeeSalaryDetails = async () => {
            try {
                const response  = await axios.get(`http://localhost:5000/employee/get/${id}`);
                const data = await response.data;
                setEmployeeSalaryDetails(data.employeesalarydetailes);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchEmployeeSalaryDetails();

    },[id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeSalaryDetails(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === "tax") {
            const netSalary = employeeSalaryDetails.salary - value;
            setEmployeeSalaryDetails(prevState => ({
                ...prevState,
                netSalary: netSalary
            }));
        }
    };

    const navigate = useNavigate();
    const handleSubmit = () => {
        axios.put(`http://localhost:5000/employee/updateSalary/${id}`, employeeSalaryDetails)
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
                <div className="custom-form-header" style={{paddingLeft: "250px", paddingRight: "250px"}}>
                    <h4 style={{fontWeight: "bold", fontSize:"20px"}}>Update Employee Details</h4>
                    <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Employee Image" className="custom-employee-image" style={{border: "1px solid black", width: "200px"}}/>
                </div>
                <form>
                    <div className="custom-form-group">
                        <label htmlFor="name" style={{fontWeight: "bold", fontSize:"15px"}}>Full Name</label>
                        <input type="text" className="custom-form-control" id="name" name="name" value={employeeSalaryDetails.name} onChange={handleChange} style={{border: "1px solid black"}} />
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="position" style={{fontWeight: "bold", fontSize:"15px"}}>Position</label>
                        <input type="text" className="custom-form-control" id="position" name="position" value={employeeSalaryDetails.position} onChange={handleChange} style={{border: "1px solid black"}}/>
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="email" style={{fontWeight: "bold", fontSize:"15px"}}>Email</label>
                        <input type="email" className="custom-form-control" id="email" name="email" value={employeeSalaryDetails.email} onChange={handleChange} style={{border: "1px solid black"}}/>
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="salary" style={{fontWeight: "bold", fontSize:"15px"}}>Salary ($)</label>
                        <input type="number" className="custom-form-control" id="salary" name="salary" value={employeeSalaryDetails.salary} onChange={handleChange} style={{border: "1px solid black"}}/>
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="tax" style={{fontWeight: "bold", fontSize:"15px"}}>Tax (%)</label>
                        <input type="number" className="custom-form-control" id="tax" name="tax" value={employeeSalaryDetails.tax} onChange={handleChange} style={{border: "1px solid black"}}/>
                    </div>
                    <div className="custom-form-group">
                        <label htmlFor="netSalary" style={{fontWeight: "bold", fontSize:"15px"}}>Net Salary ($)</label>
                        <input type="text" className="custom-form-control" id="netSalary" name="netSalary" value={employeeSalaryDetails.netSalary} readOnly style={{border: "1px solid black"}} />
                    </div>
                    <button type="button" className="custom-btn-primary" onClick={handleSubmit}>Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
