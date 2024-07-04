const express = require("express");
const jobmodel = require("../../models/job vacancy models/vacancymodel");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/applicants",async(req,res)=>{
    const data= await jobmodel.find({})
  
    res.json({success:true,data:data})
})

const sendEmail = async (to, subject, text) => {
   try {
     // Create transporter object using SMTP transport
     let transporter = nodemailer.createTransport({
       service: 'Gmail',
       auth: {
         user: "amith457n@gmail.com", // Your Gmail email address
         pass: "whcx fhev ecyo fbwk" // Your Gmail password
       }
     });
 
     // Send mail with defined transport object 
     let info = await transporter.sendMail({
       from: "amith457n@gmail.com", // Sender address
       to: to, // List of receivers
       subject: subject, // Subject line
       text: text // Plain text body
     });
 
     console.log("Message sent: %s", info.messageId);
   } catch (error) {
     console.error("Error sending email:", error);
   }
 };
 


 router.post("/create", async (req, res) => {
   try {
     const data = new jobmodel(req.body);
     await data.save();
 
     // Send email upon successful form submission
     const { name, email } = req.body;
     const subject = "Application Submitted Successfully";
     const text = `Dear ${name},\n\nYour application has been submitted successfully.\n\nThank you for applying.`;
     sendEmail(email, subject, text);
     res.send({ success: true, message: "Application submitted successfully" });
   } catch (error) {
     console.error("Error submitting application:", error);
     res.status(500).send({ success: false, message: "An error occurred while submitting the form" });
   }
 });

// update
router.put("/update",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await jobmodel.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})


// delete
router.delete("/delete/:id",async(req,res)=>{
const id=req.params.id
const data=await jobmodel.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})


// updated
router.get("/job/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const discount = await jobmodel.findById(id);

        if (!discount) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

//get count in discount table
router.get("/count",async(req,res)=>{
    try{
        const users=await jobmodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"discount count successfully",data:data})
    }

});


//////////////////////////
router.post("/approve", (req, res) => {
   const { id, email } = req.body;

   // Send email to the approved applicant
   const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
           user: "amith457n@gmail.com", // Your Gmail email address
         pass: "whcx fhev ecyo fbwk" // Your Gmail password
       }
   });

   const mailOptions = {
       from: "amith457n@gmail.com",
       to: email,
       subject: "Application Approved",
       text: "Congratulations! Your application has been approved."
   };

   transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           console.error("Error sending email:", error);
           res.status(500).send("Error sending email");
       } else {
           console.log("Email sent:", info.response);
           // You can send a response back to the client if needed
           res.status(200).send("Email sent successfully");
       }
   });

   // Handle approval logic (update database, etc.)
   res.sendStatus(200);
});
module.exports=router;