const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const otSalariesSchema = new Schema({

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

    salary:{
        type: Number,
        required: true
    },

    noOFOThours:{
        type: Number,
        required: true
        
        
    },
    oTnetSalary:{
        type: Number,
        required: true
        
    },

   

 })

const OtSalaries = mongoose.model("OtSalaries",otSalariesSchema);

module.exports = OtSalaries;

