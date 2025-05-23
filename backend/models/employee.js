const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    No:{
         type : String,
        
    },
    name:{
        type : String,
        required: true //backend validation
    },
    position:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    }
    



})

const Employee = mongoose.model("Employee",employeeSchema);


 

module.exports = Employee;