import React, { useEffect, useState } from "react";
import './updateSalary.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSpecial (){

    const {id} = useParams();
    const [specialLeavingSalaries, setspecialLeavingSalaries] = useState({
        id: id,
        name:'',
        position:'',
        email:'',
        gender:'',
        salary:'',
        noOFleavingdates:'',
        leavingNetnetSalary:''
    });

    useEffect(() => {
        const fetchSpecialLeavingSalaries = async () => {
                try {
                  const response  = await axios.get(`http://localhost:5000/employee/getSpecial/${id}`);
                  const data = await response.data;
                  setspecialLeavingSalaries(data.specialLeavingSalaries);
                } catch (error) {
                  console.error('Error fetching user details:', error);
                }
              };
      
              fetchSpecialLeavingSalaries();
      
            },[id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setspecialLeavingSalaries(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        if (name === "noOFleavingdates") {
            const leavingNetnetSalary = specialLeavingSalaries.salary * (1 - value / 30); // Assuming deduction for each leaving day
            setspecialLeavingSalaries(prevState => ({
                ...prevState,
                leavingNetnetSalary: leavingNetnetSalary
            }));
        }
    };

    const navigate = useNavigate();
    const handleSubmit = () => {
        axios.put(`http://localhost:5000/employee/updateSpecial/${id}`, specialLeavingSalaries)
            .then(res => {
                navigate('/dashboard');
            })
            .catch(err => {
                console.error('Error:', err);
            });
    };
    

    return (

<div>
<div class="custom-update-container"> {/* Updated class name */}
    <div class="custom-form-container" > {/* Updated class name */}
        <div class="custom-form-header" style={{paddingLeft: "200px", paddingRight: "200px"}}> {/* Updated class name */}
            <h4 style={{fontWeight: "bold", fontSize:"20px"}}>Update Special leaving Details</h4> {/* Updated label */}
            <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Employee Image" className="custom-employee-image" style={{border: "1px solid black", width: "200px"}}/> {/* Updated class name */}
        </div>
        <form>
            <div class="special-form-group"> {/* Updated class name */}
                <label htmlFor="name" style={{fontWeight: "bold", fontSize:"15px"}}>Full Name</label>
                <input type="text" class="custom-form-control" id="name" name="name" value={specialLeavingSalaries.name} onChange={handleChange} /> {/* Updated class name */}
            </div>
            <div class="special-form-group"> {/* Updated class name */}
                <label htmlFor="position" style={{fontWeight: "bold", fontSize:"15px"}}>Position</label>
                <input type="text" class="custom-form-control" id="position" name="position" value={specialLeavingSalaries.position} onChange={handleChange} /> {/* Updated class name */}
            </div>
            <div class="special-form-group"> {/* Updated class name */}
                <label htmlFor="email" style={{fontWeight: "bold", fontSize:"15px"}}>Email</label>
                <input type="email" class="custom-form-control" id="email" name="email" value={specialLeavingSalaries.email} onChange={handleChange} /> {/* Updated class name */}
            </div>
            <div class="special-form-group"> {/* Updated class name */}
                <label htmlFor="salary" style={{fontWeight: "bold", fontSize:"15px"}}>Salary ($)</label>
                <input type="number" class="custom-form-control" id="salary" name="salary" value={specialLeavingSalaries.salary} onChange={handleChange} /> {/* Updated class name */}
            </div>
            <div class="special-form-group"> {/* Updated class name */}
                <label htmlFor="tax" style={{fontWeight: "bold", fontSize:"15px"}}>No of Days</label>
                <input type="number" class="custom-form-control" id="tax" placeholder="noOFleavingdates" name="noOFleavingdates" value={specialLeavingSalaries.noOFleavingdates} onChange={handleChange} /> {/* Updated class name */}
            </div>
            <div class="special-form-group"> {/* Updated class name */}
                <label htmlFor="netSalary" style={{fontWeight: "bold", fontSize:"15px"}}>Net Salary ($)</label>
                <input type="text" class="custom-form-control" id="netSalary" name="netSalary" value={specialLeavingSalaries.leavingNetnetSalary} readOnly /> {/* Updated class name */}
            </div>
            <button type="button" class="custom-btn-primary" onClick={handleSubmit}>Save Changes</button> {/* Updated class name */}
        </form>
    </div>
</div>
</div>


        
    )
}

export default UpdateSpecial;
