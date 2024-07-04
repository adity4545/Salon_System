const mongoose=require("mongoose")
const job=mongoose.Schema({
    name:String,
    email:String,
    address:String,
    mobile:String,
    age:String,
    gender:String,
    position:String,
    
     
     },{
         timestamps:true
     
     })
     
     const jobmodel=mongoose.model("vacancy-management",job)
     module.exports=jobmodel;