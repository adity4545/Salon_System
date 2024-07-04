import './Application.css';
import FormApplication from "./FormApplication";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Application = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
    age: "",
    gender: "",
    position: "",
    uploadfile: ""
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "Your name should be only characters and Shouldn't include any special charcters and numbers!",
      label: "Name",
      pattern: "[A-Za-z ]+",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be valid email address! ",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "City",
      label: "Current City",
      required: true,
    },
    {
      id: 4,
      name: "mobile",
      type: "text",
      placeholder: "Mobile",
      errorMessage: "You should be 1-10 numbers eg:071XX XX XXX",
      label: "Mobile",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: 5,
      name: "age",
      type: "text",
      placeholder: "Age",
      errorMessage: "Your age should be 20-40",
      label: "Age",
      pattern: "(2[0-9]|3[0-9]|40)",
      required: true,
    },
    {
      id: 6,
      name: "gender",
      type: "select",
      placeholder: "Gender",
      label: "Gender",
      options: [
        { value: "", label: "Select Your Gender" },
        { value: "female", label: "Female" },
        { value: "male", label: "Male" },
       ],
      required: true,

    },
    {
      id: 7,
      name: "position",
      type: "select",
      placeholder: "Position",
      label: "Job Position",
      options: [
        { value: "", label: "Select a Position" },
        { value: "Haircut", label: "Haircut" },
        { value: "Beautician", label: "Beautician" },
        { value: "Oil Massage", label: "Oil Massage" },
        { value: "Nail Artist", label: "Nail Artist" },
      ],
      required: true,
    },
    {
      id: 8,
      name: "uploadfile",
      type: "file",
      placeholder: "UploadFile",
      errorMessage: "send your CV as a PDF or jpg",
      label: "Upload Your CV",
      required: false,
    }
  ];

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/create", values);
      setValues({
        name: '',
        email: '',
        address: '',
        mobile: '',
        age: '',
        gender: '',
        position: '',
        uploadfile: null,
      });
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted Successfully',
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      console.error("Application Submission Error:", error);
      setAlert({
        type: "danger",
        message: "An error occurred while submitting the form. Please try again later."
      });
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="job-vacancy-application photo">
      <div className="application">
        <form onSubmit={handleSubmit}>
          <h1>My Application</h1>
          <h1 className="aa">######</h1>
          {inputs.map((input) => (
            <FormApplication
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="sub">Submit</button>
          <Link to="/az">
            <button className="back">Back</button>
          </Link>
        </form>
        {alert.message && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Application;