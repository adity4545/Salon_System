import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./allSpecialLeave.css"

export default function AllSpecialSalary() {
  const [specialLeavingSalaries, setSpecialLeavingSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getSpecialLeavingSalaries() {
      axios.get("http://localhost:5000/employee/allSpecialsalaries")
        .then((res) => {
          setSpecialLeavingSalaries(res.data);
        }).catch((err) => {
          alert(err.message);
        });
    }
    getSpecialLeavingSalaries();
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
    const titleText = "Filtered Special Salary Details";
    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 70;
    doc.text(titleText, titleX, titleY);

    const headers = ["#", "Name", "Position", "Email", "Salary", "No of Leaving Days", "Special Leaving Net Salary"];
    const rows = filteredSpecialLeavingSalaries.map((employee, index) => [
        index + 1,
        employee.name,
        employee.position,
        employee.email,
        employee.salary,
        employee.noOFleavingdates,
        employee.leavingNetnetSalary,
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

    doc.save("filtered_special_salary_report.pdf");
};

const filteredSpecialLeavingSalaries = specialLeavingSalaries.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
);

  function handleDelete(id) {
    axios.delete(`http://localhost:5000/employee/deleteSpecial/${id}`)
      .then(() => {
        const newSpecialLeavingSalaries = specialLeavingSalaries.filter(Ot => Ot._id !== id);
        setSpecialLeavingSalaries(newSpecialLeavingSalaries);
      }).catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className="special-table-container">
      <div className="special-search-container">
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
      <Link to="/addSpecialLeavingSalary">
        <button className="special-add-button">Add New Special Salary</button>
      </Link>
      <table className="special-table">
        <thead>
          <tr className="special-table-header" >
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Salary</th>
            <th>No of Leaving Days</th>
            <th>Net Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSpecialLeavingSalaries.map((specialLeavingSalaries, index) => (
            <tr className="special-table-row" key={index}  style={{color:"black"}}>
              <th>{index + 1}</th>
              <td>{specialLeavingSalaries.name}</td>
              <td>{specialLeavingSalaries.position}</td>
              <td>{specialLeavingSalaries.email}</td>
              <td>{specialLeavingSalaries.salary}</td>
              <td>{specialLeavingSalaries.noOFleavingdates}</td>
              <td>{specialLeavingSalaries.leavingNetnetSalary}</td>
              <td>
                <Link to={`/updateSpecial/${specialLeavingSalaries._id}`}>
                  <button className="special-action-button update">Update</button>
                </Link>
                <button className="special-action-button delete" onClick={() => handleDelete(specialLeavingSalaries._id)}>Delete</button>
                <Link to={`/getSpecial/${specialLeavingSalaries._id}`}>
                  <button className="special-action-button view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePDF} className="special-action-button generate-pdf"  style={{marginTop:"10px"}}>Generate Report</button>
    </div>
  );
}
