import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./all OT Salary/allSpecialLeave.css"; // Import the same CSS file used in the AllSpecialSalary component

export default function AllEmployeesalarydetailes() {
  const [employeesalarydetailes, setEmployeesalarydetailes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getEmployeesalarydetailes() {
      axios.get("http://localhost:5000/employee/allSalary")
        .then((res) => {
          setEmployeesalarydetailes(res.data);
        }).catch((err) => {
          alert(err.message);
        });
    }
    getEmployeesalarydetailes();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    const salonAddressLines = [
        "E3, Isurupura",
        "Malabe",
        "Sri Lanka",
    ];
    salonAddressLines.forEach((line, index) => {
        const yPos = 30 + (index * 10);
        doc.text(line, 150, yPos);
    });

    doc.setFontSize(14);
    const titleText = "Filtered Salary Details";
    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 70;
    doc.text(titleText, titleX, titleY);

    const headers = ["#", "Name", "Position", "Email", "Gender", "Salary", "Tax Rate", "Net Salary"];
    const rows = filteredemployeesalarydetailes.map((employee, index) => [
        index + 1,
        employee.name,
        employee.position,
        employee.email,
        employee.gender,
        employee.salary,
        employee.tax,
        employee.netSalary,
    ]);

    const tableProps = {
        startY: titleY + 20,
        margin: { horizontal: 10 },
        styles: { cellPadding: 5, fontSize: 10, cellWidth: "auto" },
        headStyles: { fillColor: [100, 100, 100], textColor: [255, 255, 255] },
        bodyStyles: { textColor: [0, 0, 0] },
    };

    doc.autoTable(headers, rows, tableProps);

    const signatureText = "Manager's Signature:";
    doc.text(".................................", 168, 280);
    const textWidth = doc.getStringUnitWidth(signatureText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const textX = doc.internal.pageSize.width - textWidth - 10;
    const textY = doc.internal.pageSize.height - 10;
    doc.text(textX, textY, signatureText);

    doc.save("filtered_salary_details_report.pdf");
};


  const filteredemployeesalarydetailes = employeesalarydetailes.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(id) {
    axios.delete(`http://localhost:5000/employee/deleteSalary/${id}`)
      .then(() => {
        const newEmployeesalarydetailes = employeesalarydetailes.filter(Emp => Emp._id !== id);
        setEmployeesalarydetailes(newEmployeesalarydetailes);
      }).catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className="special-table-container" style={{backgroundColor: "#F7C8BB"}}> {/* Use the same container class */}
      <div className="special-search-container"> {/* Use the same search container class */}
        <input
          type="text"
          className="special-search-input"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="special-search-icon"><i className="fa fa-search"></i></span>
        <span className="special-microphone-icon"><i className="fa fa-microphone"></i></span>
      </div>
      <Link to="/addSalary">
        <button className="special-add-button">Add New Salary Details</button>
      </Link>
      <button onClick={generatePDF} className="special-action-button generate-pdf">Generate Report</button>
      <table className="special-table"> {/* Use the same table class */}
        <thead>
          <tr className="special-table-header" >
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Tax Rate</th>
            <th>Net Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredemployeesalarydetailes.map((employeesalarydetailes, index) => (
            <tr className="special-table-row" key={index} style={{color:"black"}}>
              <th>{index + 1}</th>
              <td>{employeesalarydetailes.name}</td>
              <td>{employeesalarydetailes.position}</td>
              <td>{employeesalarydetailes.email}</td>
              <td>{employeesalarydetailes.gender}</td>
              <td>{employeesalarydetailes.salary}</td>
              <td>{employeesalarydetailes.tax}</td>
              <td>{employeesalarydetailes.netSalary}</td>
              <td>
                <Link to={`/updateSalary/${employeesalarydetailes._id}`}>
                  <button className="special-action-button update">Update</button>
                </Link>
                <button className="special-action-button delete" onClick={() => handleDelete(employeesalarydetailes._id)}>Delete</button>
                <Link to={`/get/${employeesalarydetailes._id}`}>
                  <button className="special-action-button view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
