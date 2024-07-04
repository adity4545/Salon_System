const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const employeesalarydetailesSchema = new Schema({

    No:{
          type : String,
        
   },
   name:{
        type : String,
         required: true //backend validation
     },
   position:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    gender:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true,
    },

    tax:{
        type: String,
        required: true
        
        
    },
    netSalary:{
        type: Number,
        required: true,
       
        
    },

    // profileImage:{

    //     type:Buffer,

    // }
    

    


 })

const Employeesalarydetailes = mongoose.model("Employeesalarydetailes",employeesalarydetailesSchema);

module.exports = Employeesalarydetailes;
