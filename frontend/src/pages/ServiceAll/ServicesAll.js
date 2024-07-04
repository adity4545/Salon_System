import React, { useState, useEffect } from "react";
import "./Service.css";
import { NavLink } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/logo.png";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export default function ServicesAll() {
  const [getServiceData, setServiceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/services/getservicedata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setServiceData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredServices = getServiceData.filter((service) =>
      service.s_name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredServices);
  };

  const deleteservice = async (id) => {
    // Ask for confirmation before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmed) {
      return; // Do nothing if user cancels
    }

    try {
      const res2 = await fetch(`http://localhost:5000/services/deleteservice/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedata = await res2.json();
      console.log(deletedata);

      if (res2.status === 422 || !deletedata) {
        console.log("error");
      } else {
        console.log("Service deleted");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo
    const logoImage = new Image();
    logoImage.src = logo;
    const logoWidth = 50;
    const logoHeight = 25;
    doc.addImage(logoImage, "PNG", 10, 10, logoWidth, logoHeight);

    // Add address
    const address = "352/A/2,\nArawwala,\nPannipitiya.";
    doc.setFontSize(10);
    doc.text(address, 190, 20, { align: "right" });

    // Draw line above the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(0);
    doc.line(10, 40, 200, 40); // Draw line from (10, 55) to (200, 55)

    // Set initial y position after logo, address, and line
    let y = 55; // Adjust the y position as needed

    // Title
    doc.setFontSize(22);
    doc.text("Services Report", 105, y, { align: "center" });
    y += 10;

    // Table columns
    const columns = ["ID", "Service Name", "Description", "Duration", "Price"];
    const columnWidths = [15, 40, 60, 25, 25]; // Adjust the widths as needed
    const rows = [];

    // Populate table rows
    filteredData.forEach((service, index) => {
      rows.push([
        index + 1,
        service.s_name,
        service.s_desc,
        service.s_duration,
        service.s_price,
      ]);
    });

    // Add table with fixed column widths
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: y,
      columnStyles: {
        2: { columnWidth: 60 },
      },
      columnWidths: columnWidths,
      headStyles: { fillColor: [100, 100, 100], textColor: [255, 255, 255] },
      bodyStyles: { textColor: [0, 0, 0] },
    });

    //Add generation time at the bottom left corner
    const currentDate = new Date();
    const generatedAt = `Generated at: ${currentDate.toLocaleString()}`;
    doc.setFontSize(10);
    doc.text(generatedAt, 10, doc.internal.pageSize.height - 10);

    // Add dotted line above the Manager's Signature
    const managerSignatureX = 160; // Adjust the x-coordinate as needed
    const managerSignatureY = doc.internal.pageSize.height - 10; // Adjust the y-coordinate as needed
    doc.setLineDashPattern([1, 1], 0); // Set line pattern to dashed
    doc.line(150, managerSignatureY - 5, 200, managerSignatureY - 5); // Draw dotted line

    // Add Manager's Signature placeholder
    doc.setFontSize(10);
    doc.text("Manager's Signature:", managerSignatureX, managerSignatureY);

    doc.save("services_report.pdf");
  };

  return (
    <div className="box">
      <div className="sbox3">
        <h2>Our Services</h2>
        <div className="search-bar">
          <input
            type="text"
            className="input"
            placeholder="Search Service..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          className="btn btn-primary mb-3"
          onClick={generatePDF}
          style={{ marginTop: "10px", fontSize: "15px", marginLeft: "0px" }}
        >
          Generate PDF Report
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Service Name</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Price</th>
              <th scope="col" style={{ width: "100px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((service, index) => (
              <tr key={service._id}>
                <th scope="row">{index + 1}</th>
                <td>{service.s_name}</td>
                <td>{service.s_desc}</td>
                <td>{service.s_duration}</td>
                <td>{service.s_price}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <NavLink to={`/serviewda/${service._id}`}>
                      <button className="btn btn-success me-3">
                        <FaEye style={{ fontSize: "18px" }}/>
                      </button>
                    </NavLink>
                    <NavLink to={`/serupdateform/${service._id}`}>
                      <button className="btn btn-warning me-3">
                        <FaPenToSquare style={{ fontSize: "18px" }}/>
                      </button>
                    </NavLink>
                    <NavLink>
                      <button
                        className="btn btn-danger me-3"
                        onClick={() => deleteservice(service._id)}
                      >
                        <MdDelete style={{ fontSize: "18px" }}/>
                      </button>
                    </NavLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
