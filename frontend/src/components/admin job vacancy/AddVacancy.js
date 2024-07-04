import React, { useEffect, useState } from "react";
import '../employee salary/all OT Salary/addSpecialSalaryLeave.css';
import Formtable from "./Formtable";
import axios from "axios";
import Swal from 'sweetalert2';

axios.defaults.baseURL = "http://localhost:5000/";

export default function AddVacancy() {
    const [addSection, setAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        position: "",
        salary: "",
        age_limit: "",
        description: "",
        id: ""
    });
    const [formDataEdit, setFormDataEdit] = useState({
        position: "",
        salary: "",
        age_limit: "",
        description: ""
    });
    const [dataList, setDataList] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    const handleOnChange = (e)=>{
        const{value,name} = e.target;
        if (name === 'position') {
            // Check if the value contains only letters and spaces
            const isValid = /^[a-zA-Z\s]*$/.test(value);
            if (!isValid) {
                // If not valid, show an error message
                alert("Position should contain only letters and spaces.");
                return; // Don't update state
            }
        }

        if (name === 'salary') {
            // Check if the value contains only numbers
            const isValid = /^\d*$/.test(value);
            if (!isValid) {
                // If not valid, show an error message
                alert("Salary should contain only numbers.");
                return; // Don't update state
            }
        }

        if (name === 'age_limit') {
            // Check if the value contains only numbers or the letters 't' or 'o'
            const isValid = /^[0-9to]*$/i.test(value);
            if (!isValid) {
                // If not valid, show an error message
                alert("Age Limit should contain only numbers, 't', or 'o'.");
                return; // Don't update state
            }
        }
    

        // Remove any non-numeric characters from the input value
        const updatedValue = name === 'salary' ? value.replace(/\D/g, '') : value;

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.position || !formData.salary || !formData.age_limit || !formData.description) {
            alert("Please fill in all fields.");
            return;
        }

        // Prepend "Rs." to the salary value before sending it to the backend
        const formattedData = {
            ...formData,
            salary: `Rs.${formData.salary}`
        };

        try {
            const data = await axios.post("/create_salary", formattedData);
            if (data.data.success) {
                setAddSection(false);
                setSuccessMessage(data.data.message);
                fetchData();
                Swal.fire({
                    icon: 'success',
                    title: 'Vacancy Added Successful',
                    text: 'Vacancy has been added successfully.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while updating the Vacancy. Please try again later.");
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("/get_data");
            if (response.data.success) {
                setDataList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Confirm delete',
            text: 'Are you sure you want to delete this Vacancy?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });

        if (result.isConfirmed) {
            try {
                const data = await axios.delete("/delete_salary/" + id);
                if (data.data.success) {
                    fetchData();
                    setSuccessMessage(data.data.message);
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete Successful',
                        text: 'Vacancy has been deleted successfully.',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            } catch (error) {
                console.error("Error deleting data:", error);
                alert("An error occurred while deleting the Vacancy. Please try again later.");
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.put("/update_salary", formDataEdit);
            if (data.data.success) {
                fetchData();
                setSuccessMessage(data.data.message);
                setEditSection(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successful',
                    text: 'Vacancy has been updated successfully.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        } catch (error) {
            console.error("Error updating data:", error);
            alert("An error occurred while updating the Vacancy. Please try again later.");
        }
    };

    const handleEditOnChange = (e) => {
        const { value, name } = e.target;
        setFormDataEdit((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = (item) => {
        setFormDataEdit(item);
        setEditSection(true);
    };

    return (
        <div className='special-table-container'>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <button className="special-add-button" onClick={() => setAddSection(true)}>Add Vacancy</button>

            {addSection && (
                <Formtable
                    handleSubmit={handleSubmit}
                    handleOnChange={handleOnChange}
                    handleclose={() => setAddSection(false)}
                    readonly={formData}
                />
            )}

            {editSection && (
                <Formtable
                    handleSubmit={handleUpdate}
                    handleOnChange={handleEditOnChange}
                    handleclose={() => setEditSection(false)}
                    readonly={formDataEdit}
                />
            )}

            <table className="special-table">
                <thead>
                    <tr className="special-table-header">
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Age Limit</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.length > 0 ? (
                        dataList.map((item, index) => (
                            <tr className="special-table-row" key={index} style={{ color: '#3b2918' }} >
                                <td>{item.position}</td>
                                <td>{item.salary}</td>
                                <td>{item.age_limit}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button className="special-action-button update" onClick={() => handleEdit(item)} style={{ width: '63px', height: '35px' ,marginBottom :'8px'}}>Edit</button>
                                    <button className="special-action-button delete" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center"}}>No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

