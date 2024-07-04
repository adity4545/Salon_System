import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './employeeSalarydetailes.css';

const SpecialSalaryView = () => {
  const { id } = useParams();
  const [specialLeavingSalaries, setSpecialLeavingSalaries] = useState(null);

  useEffect(() => {
    const fetchSpecialLeavingSalaries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employee/getSpecial/${id}`);
        const data = response.data.specialLeavingSalaries;
        setSpecialLeavingSalaries(data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchSpecialLeavingSalaries();
  }, [id]);

  return (
    <div className="employee-salary-profile-container">
      {specialLeavingSalaries ? (
        <div className="employee-salary-profile-card-container">
          <div className="employee-salary-profile-card">
            <div className="employee-salary-profile-card-row">
              <div className="employee-salary-profile-side">
                <div className="employee-salary-profile-block text-center text-white">
                  <div className="employee-salary-profile-img-wrapper">
                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="User Profile" className="employee-salary-profile-img" />
                  </div>
                  <h6 className="employee-salary-profile-name">{specialLeavingSalaries.name}</h6>
                  <p className="employee-salary-profile-position">{specialLeavingSalaries.position}</p>
                  <i className="mdi mdi-square-edit-outline feather icon-edit employee-salary-profile-edit-icon"></i>
                </div>
              </div>
              <div className="employee-salary-profile-main">
                <div className="employee-salary-profile-block">
                  <div className="employee-salary-profile-row">
                    <div className="employee-salary-profile-col">
                      <p className="employee-salary-profile-label">Name</p>
                      <h6 className="employee-salary-profile-info">{specialLeavingSalaries.name}</h6>
                    </div>
                    <div className="employee-salary-profile-col">
                      <p className="employee-salary-profile-label">Position</p>
                      <h6 className="employee-salary-profile-info">{specialLeavingSalaries.position}</h6>
                    </div>

                  </div>
                  <div className="employee-salary-profile-row">
                  <div className="employee-salary-profile-col">
                      <p className="employee-salary-profile-label">Net Salary</p>
                      <h6 className="employee-salary-profile-info">{specialLeavingSalaries.leavingNetnetSalary}</h6>
                    </div>
                    <div className="employee-salary-profile-col">
                      <p className="employee-salary-profile-label">No of leaving dates</p>
                      <h6 className="employee-salary-profile-info">{specialLeavingSalaries.noOFleavingdates}</h6>
                    </div>
                    <div className="employee-salary-profile-col">
                      <p className="employee-salary-profile-label">Salary</p>
                      <h6 className="employee-salary-profile-info">{specialLeavingSalaries.salary}</h6>
                    </div>
                    <div className="employee-salary-profile-row">
                    <div className="employee-salary-profile-col">
                      <p className="employee-salary-profile-label">Email</p>
                      <h6 className="employee-salary-profile-info">{specialLeavingSalaries.email}</h6>
                    </div>
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

export default SpecialSalaryView;
