import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './employeeSalarydetailes.css';

const EmployeeSalaryDetails = () => {
    const { id } = useParams();
    const [employeeSalaryDetails, setEmployeeSalaryDetails] = useState(null);
  
    useEffect(() => {
      const fetchEmployeeSalaryDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/employee/get/${id}`);
          const data = response.data.employeesalarydetailes; 
          setEmployeeSalaryDetails(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      fetchEmployeeSalaryDetails();
    }, [id]);
  
    return (
      <div className="employee-salary-profile-container">
        {employeeSalaryDetails ? (
          <div className="employee-salary-profile-card-container">
            <div className="employee-salary-profile-card">
              <div className="employee-salary-profile-card-row">
                <div className="employee-salary-profile-side">
                  <div className="employee-salary-profile-block text-center text-white">
                    <div className="employee-salary-profile-img-wrapper">
                      <img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="User Profile" className="employee-salary-profile-img" />
                    </div>
                    <h6 className="employee-salary-profile-name">{employeeSalaryDetails.name}</h6>
                    <p className="employee-salary-profile-position">{employeeSalaryDetails.position}</p>
                    <i className="mdi mdi-square-edit-outline feather icon-edit employee-salary-profile-edit-icon"></i>
                  </div>
                </div>
                <div className="employee-salary-profile-main">
                  <div className="employee-salary-profile-block">
                    <div className="employee-salary-profile-row">
                      <div className="employee-salary-profile-col">
                        <p className="employee-salary-profile-label">Name</p>
                        <h6 className="employee-salary-profile-info">{employeeSalaryDetails.name}</h6>
                      </div>
                      <div className="employee-salary-profile-col">
                        <p className="employee-salary-profile-label">Position</p>
                        <h6 className="employee-salary-profile-info">{employeeSalaryDetails.position}</h6>
                      </div>
                      <div className="employee-salary-profile-col">
                        <p className="employee-salary-profile-label">Net Salary</p>
                        <h6 className="employee-salary-profile-info">{employeeSalaryDetails.netSalary}</h6>
                      </div>

                      <div className="employee-salary-profile-col">
                        <p className="employee-salary-profile-label">Gender</p>
                        <h6 className="employee-salary-profile-info">{employeeSalaryDetails.gender}</h6>
                      </div>
                      <div className="employee-salary-profile-col">
                        <p className="employee-salary-profile-label">Salary</p>
                        <h6 className="employee-salary-profile-info">{employeeSalaryDetails.salary}</h6>
                      </div>
                      <div className="employee-salary-profile-col">
                        <p className="employee-salary-profile-label">Tax</p>
                        <h6 className="employee-salary-profile-info">{employeeSalaryDetails.tax}</h6>
                      </div>
                      <div className="employee-salary-profile-col">
                        <p className="employee-salary-profile-label">Email</p>
                        <h6 className="employee-salary-profile-info">{employeeSalaryDetails.email}</h6>
                      </div>
                    </div>
                    <ul className="employee-salary-profile-social-links">
                      <li><a href="#!" title="facebook"><i className="mdi mdi-facebook feather icon-facebook facebook"></i></a></li>
                      <li><a href="#!" title="twitter"><i className="mdi mdi-twitter feather icon-twitter twitter"></i></a></li>
                      <li><a href="#!" title="instagram"><i className="mdi mdi-instagram feather icon-instagram instagram"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading page...</p>
        )}
      </div>
    );
  };
  
  export default EmployeeSalaryDetails;
