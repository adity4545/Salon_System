import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "../employee salary/all OT Salary/allSpecialLeave.css";

function AllApplicationadmin() {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [approvedApplicants, setApprovedApplicants] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/applicants")
      .then(response => {
        setApplicants(response.data.data);
        setFilteredApplicants(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching applicants:", error);
      });
  }, []);

  useEffect(() => {
    const filteredData = applicants.filter(applicant =>
      applicant.position && applicant.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplicants(filteredData);
  }, [searchTerm, applicants]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

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
    const titleText = "Application Table";
    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 70;
    doc.text(titleText, titleX, titleY);
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, 10, 280);

    const headers = ["#", "Name", "Email", "Current City", "Mobile Number", "Age", "Gender", "Job Type"];
    const rows = filteredApplicants.map((applicant, index) => [
      index + 1,
      applicant.name,
      applicant.email,
      applicant.address,
      applicant.mobile,
      applicant.age,
      applicant.gender,
      applicant.position
    ]);

    const tableProps = {
      startY: titleY + 20,
      margin: { horizontal: 10 },
      styles: { cellPadding: 5, fontSize: 10, cellWidth: "auto" },
      headStyles: { fillColor: [100, 100, 100], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [0, 0, 0] },
    };

    doc.autoTable(headers, rows, tableProps);

    doc.save("Applicants_report.pdf");
  };

  const Deleteapp = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Reject',
        text: 'Are you sure you want to reject this applicant?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel'
      });
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:5000/delete/${id}`);
        if (response.data.success) {
          const updatedApplicants = applicants.filter(applicant => applicant._id !== id);
          setApplicants(updatedApplicants);
          setFilteredApplicants(updatedApplicants);
          Swal.fire('Success', 'Application rejected!', 'success');
        } else {
          Swal.fire('Error', response.data.message, 'error');
        }
      }
    } catch (error) {
      console.error("Error deleting applicant:", error);
      Swal.fire('Error', 'Failed to reject application', 'error');
    }
  };
  
  const approveApplicant = async (id, email) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Approval',
        text: 'Are you sure you want to approve this applicant?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Approve',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        await axios.post("http://localhost:5000/approve", { id, email });
        await axios.delete(`http://localhost:5000/delete/${id}`);
        const approvedApplicant = applicants.find(applicant => applicant._id === id);
        setApprovedApplicants(prevApprovedApplicants => [...prevApprovedApplicants, approvedApplicant]);
        const updatedApplicants = applicants.filter(applicant => applicant._id !== id);
        setApplicants(updatedApplicants);
        setFilteredApplicants(updatedApplicants);
        console.log("Applicant approved and deleted successfully!");
        Swal.fire('Success', 'Application approved!', 'success');
      } else {
        console.log("Approval cancelled");
      }
    } catch (error) {
      console.error("Error approving applicant:", error);
      Swal.fire('Error', 'Failed to approve application', 'error');
    }
  };

  const applicantCount = filteredApplicants.length;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const applicantDetails = filteredApplicants.map((applicant, index) => (
    <tr key={index} style={{ color: '#3b2918' }}>
      <th>{index + 1}</th>
      <td>{applicant.name}</td>
      <td>{applicant.email}</td>
      <td>{applicant.address}</td>
      <td>{applicant.mobile}</td>
      <td>{applicant.age}</td>
      <td>{applicant.gender}</td>
      <td>{applicant.position}</td>
      <td>
        <button className="special-action-button update" onClick={() => approveApplicant(applicant._id, applicant.email)}>Approve</button>
      </td>
      <td>
        <button className="special-action-button delete" onClick={() => Deleteapp(applicant._id)}>Reject</button>
      </td>
    </tr>
  ));

  const approvedApplicantDetails = approvedApplicants.map((applicant, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{applicant.name}</td>
      <td>{applicant.email}</td>
      <td>{applicant.address}</td>
      <td>{applicant.mobile}</td>
      <td>{applicant.age}</td>
      <td>{applicant.gender}</td>
      <td>{applicant.position}</td>
    </tr>
  ));

  return (
    <div className="special-table-container">
      <div className="special-search-container">
        <input
          type="text"
          className="special-search-input"
          placeholder="Search by position..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="special-search-icon"><i className="fa fa-search"></i></span>
        <span className="special-microphone-icon"><i className="fa fa-microphone"></i></span>
      </div>

      <table className="special-table">
        <thead>
          <tr className="special-table-header">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current City</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Job Type</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {applicantDetails}
        </tbody>
      </table>
      
      <p>Total submitted forms: {applicantCount}</p>
      <button className="special-action-button generate-pdf" onClick={generatePDF} style={{ background: '#5e81f2' }}>Generate PDF</button>

      {approvedApplicants.length > 0 && (
        <div className="card mt-4">
          <div className="card-header">
            <h4>Approved Applicants</h4>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Current City</th>
                  <th>Mobile Number</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {approvedApplicantDetails}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllApplicationadmin;
