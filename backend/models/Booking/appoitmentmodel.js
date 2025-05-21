const mongoose=require("mongoose");
const { Number } = require("twilio/lib/twiml/VoiceResponse");
const orderschema=mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    service:String,
    date:String,
    message:String,
}, {
    timestamps:true

})

const ordermodel=mongoose.model("Appoitment",orderschema)


module.exports = ordermodel;