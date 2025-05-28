const mongoose=require("mongoose");
const { Number } = require("twilio/lib/twiml/VoiceResponse");
const orderschema=mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    service:String,
    date:String,
    message:String,
    paymentMethod: { type: String, default: 'Pay at Store' },
}, {
    timestamps:true

})

const ordermodel=mongoose.model("Appoitment",orderschema)


module.exports = ordermodel;