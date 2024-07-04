

const express=require("express");

const salarymodel=require("../../models/job vacancy models/applicationmodel");

const router=express.Router();

const nodemailer=require("nodemailer")

router.get("/get_data",async(req,res)=>{
    const data= await salarymodel.find({})
  
    res.json({success:true,data:data})
})

// create
router.post("/create_salary",async(req,res)=>{
    const data=new salarymodel(req.body)
    await data.save()
    res.send({success:true})
})

// update
router.put("/update_salary",async(req,res)=>{
    const {_id,...rest}=req.body
    const data=await salarymodel.updateOne({_id:_id},rest)
    res.send({success:true,data:data})
})


// delete
router.delete("/delete_salary/:id",async(req,res)=>{
const id=req.params.id
const data=await salarymodel.deleteOne({_id:id})
res.send({success:true,data:data})
})


// updated
router.get("/job_salary/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const discount = await salarymodel.findById(id);

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
router.get("/count_salary",async(req,res)=>{
    try{
        const users=await salarymodel.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"discount count successfully",data:data})
    }

})

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


