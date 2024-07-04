const mongoose=require("mongoose")
const orderschema=mongoose.Schema({
    name:String,
    l_id:String,
    email:String,
    leave_time:String,
    post:String,
    reason:String
   
   

},{
    timestamps:true

})

const ordermodel=mongoose.model("leaving",orderschema)

module.exports = ordermodel;
