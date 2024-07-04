import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./allSpecialLeave.css"; // Import the same CSS file used in the AllSpecialSalary component

export default function AllOTSalary() {
  const [otSalaries, setOtSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getOtSalaries() {
      axios.get("http://localhost:5000/employee/allOTsalaries")
        .then((res) => {
          setOtSalaries(res.data);
        }).catch((err) => {
          alert(err.message);
        });
    }
    getOtSalaries();
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
    const titleText = "Filtered OT Salary Details";
    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 70;
    doc.text(titleText, titleX, titleY);

    const headers = ["#", "Name", "Position", "Email", "Salary", "No of OT Hours", "OT Net Salary"];
    const rows = filteredOtSalaries.map((employee, index) => [
        index + 1,
        employee.name,
        employee.position,
        employee.email,
        employee.salary,
        employee.noOFOThours,
        employee.oTnetSalary,
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

    doc.save("Filtered_OT_salary_report.pdf");
};

const filteredOtSalaries = otSalaries.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
);

  function handleDelete(id) {
    axios.delete(`http://localhost:5000/employee/deleteOT/${id}`)
      .then(() => {
        const newOtSalaries = otSalaries.filter(Ot => Ot._id !== id);
        setOtSalaries(newOtSalaries);
      }).catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className="special-table-container"> {/* Use the same container class */}
      <div className="special-search-container"> {/* Use the same search container class */}
        <input
          type="text"
          className="special-search-input"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="special-search-icon"><i className="fa fa-search"></i></span>
        <span className="special-microphone-icon"><i className="fa fa-microphone"></i></span>
      </div>
      <Link to="/addOTSalary">
        <button className="special-add-button">Add New OT Salary</button>
      </Link>
      <table className="special-table"> {/* Use the same table class */}
        <thead>
          <tr className="special-table-header">
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Salary</th>
            <th>No of OT Hours</th> {/* Adjust column name */}
            <th>OT Net Salary</th> {/* Adjust column name */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOtSalaries.map((otSalaries, index) => (
            <tr className="special-table-row" key={index} style={{ color: "black" }}>
              <th>{index + 1}</th>
              <td>{otSalaries.name}</td>
              <td>{otSalaries.position}</td>
              <td>{otSalaries.email}</td>
              <td>{otSalaries.salary}</td>
              <td>{otSalaries.noOFOThours}</td>
              <td>{otSalaries.oTnetSalary}</td>
              <td>
                <Link to={`/updateOt/${otSalaries._id}`}>
                  <button className="special-action-button update">Update</button>
                </Link>
                <button className="special-action-button delete" onClick={() => handleDelete(otSalaries._id)}>Delete</button>
                <Link to={`/getOT/${otSalaries._id}`}>
                  <button className="special-action-button view">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePDF} className="special-action-button generate-pdf" style={{marginTop:"10px"}}>Generate Report</button>
    </div>
  );
}
