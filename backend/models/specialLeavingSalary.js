const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const specialLeavingSalariesSchema = new Schema({

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

    noOFleavingdates:{
        type: Number,
        required: true
        
        
    },
    leavingNetnetSalary:{
        type: Number,
        required: true
        
    },

   

 })

const SpecialLeavingSalaries = mongoose.model("SpecialLeavingSalaries",specialLeavingSalariesSchema);

module.exports = SpecialLeavingSalaries;

