const mongoose=require("mongoose")
const salary=mongoose.Schema({
    position:String,
    salary:String,
    age_limit:String,
   description:String,
    
        
     
     },{
         timestamps:true
     
     })
     
     const salarymodel=mongoose.model("Application",salary)
     module.exports=salarymodel;