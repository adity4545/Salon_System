const express=require("express")
const sendEmail = require("../../utils/sendEmail");
const twilio = require("twilio");

const ordermodel = require("../../models/Booking/appoitmentmodel");

const router = express.Router();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

router.get("/",async(req,res)=>{
    const data= await ordermodel.find({})
  
    res.json({success:true,data:data})
})

router.post("/create",async(req,res)=>{
    try {
        const { ...rest } = req.body;
        const data = new ordermodel({
            ...rest,
        });
        await data.save();

        // Send SMS confirmation via Twilio
        if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
            console.warn("Twilio credentials not provided. Skipping SMS sending.");
        } else {
            let toPhone = data.phone;
            if (typeof toPhone === 'string' && !toPhone.startsWith('+')) {
                toPhone = '+' + toPhone;
            }
            const smsMessage = `Dear ${data.name}, your booking for ${data.service} on ${data.date} has been confirmed. Thank you!`;
            try {
                const message = await twilioClient.messages.create({
                    body: smsMessage,
                    from: twilioPhoneNumber,
                    to: toPhone
                });
                console.log("Twilio SMS sent:", message.sid);
            } catch (smsError) {
                console.error("Error sending SMS via Twilio:", smsError);
            }
        }

        // Send email confirmation
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: "Booking Confirmation",
            text: `Dear ${data.name},\n\nYour booking for ${data.service} on ${data.date} has been confirmed.\n\nThank you for choosing us!`
        };

        try {
            await sendEmail(mailOptions.subject, mailOptions.text, mailOptions.to, mailOptions.from, mailOptions.from);
        } catch (emailError) {
            console.error("Error sending email confirmation:", emailError);
        }

        res.send({success:true,message:"Booking created and confirmation sent successfully"});
    } catch (error) {
        console.error("Error creating booking or sending confirmation:", error);
        res.status(500).send({success:false,message:"Failed to create booking or send confirmation", error: error.message});
    }
})

router.put("/update",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await ordermodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})

router.delete("/delete/:id",async(req,res)=>{
const id=req.params.id
const data=await ordermodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})

router.get("/count",async(req,res)=>{
    try{
        const users=await ordermodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

router.get("/book/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await ordermodel.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});
module.exports = router;
