import React from "react";
import './AddVacancy.css';
import { MdClose } from "react-icons/md";

const Formtable = ({handleSubmit,handleOnChange,handleclose,readonly,})=>{

    return(
        <div className="addContainer">
            
            
    <form onSubmit={handleSubmit}>
    <div className="close-btn" onClick={handleclose}><MdClose/></div>
      
       <label htmlFor="position">Position :</label>
       <input type ="text" id ="position" name ="position" placeholder="Job Vacancy" onChange={handleOnChange} value={readonly.position}/>
  
       <label htmlFor="salary">Salary :</label>
   
       <input type ="text" id ="salary" name ="salary" placeholder="Salary Range" onChange={handleOnChange}value={readonly.salary}/>
       
       <label htmlFor="age_limit">Age Limit :</label>
       <input type ="text" id ="age_limit" name ="age_limit" placeholder="Age" onChange={handleOnChange}value={readonly.age_limit}/>
       
       <label htmlFor="description">Description :</label>
       <textarea id="description" name="description" rows="4" cols="50" placeholder="Description(Requirements)" onChange={handleOnChange}value={readonly.description}/>
       
   <button className="btn">Submit</button>
  
    </form>
    </div>
    )
}
export default Formtable;