const mongoose=require("mongoose")
const specialchema=mongoose.Schema({
    s_name:String,
    s_email:String,
    s_position:String,
    s_number:String,
   
   

},{
    timestamps:true

})

const specialmodel=mongoose.model("Special_Leaving",specialchema)



module.exports = specialmodel;