const router = require("express").Router();
const { request, response } = require("express");
// let Student = require("../modles/student");
const { default: mongoose } = require("mongoose");
const OtSalaries = require("../models/otsalary");


//create new OT Salary

router.route("/addOTSalary/").post((request,response) => {

    
    const name = request.body.name;
    const position = request.body.position;
    const email = request.body.email;
    // const gender = request.body.gender;
    const salary= Number(request.body.salary)
    // const tax = Number(request.body.Tax);
    const noOFOThours =Number(request.body.noOFOThours)
    const oTnetSalary = Number(request.body.oTnetSalary);

    const newOtSalaries = new OtSalaries({

        _id: new mongoose.Types.ObjectId(),
        name,
        position,
        email,
        // gender,
        salary,
        // tax,
        noOFOThours,
        oTnetSalary

    }) 

    //java scripts promise = using then
    newOtSalaries.save().then(()=>{
        response.json("Employee OT salary Added");
    }).catch((error)=>{
        console.log(error);
    })

})


//read
router.route("/allOTsalaries").get((request,response) => {

    OtSalaries.find().then((otSalaries) => {
        response.json(otSalaries)
    }).catch((error)=>{
        console.log(error)
    })
})


router.route("/updateOt/:id").put(async(request,response)=>{
    let userId = request.params.id; //params = parameter
    //distructure
    const {name,position,email,salary,noOFOThours,oTnetSalary} = request.body;

    //create object
    const updateOtSalaries = {
        name,
        position,
        email,
        salary,
        noOFOThours,
        oTnetSalary

    }

  await OtSalaries.findByIdAndUpdate(userId,updateOtSalaries).then(() => {

    response.status(200).send({status: "user salary updated"})
   }).catch((error) => {
    console.log(error);
    response.status(500).send({status: "Error with updating data",error: err.message});
   })
})

// router.patch("/update/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
        
//         const updatedEmployeesalarydetailes = await employeesalarydetailes.findByIdAndUpdate(id, req.body,{
//             new:true
//         });
//         console.log(updatedEmployeesalarydetailes);
//         res.status(201).json(updatedEmployeesalarydetailes);
//     } catch (error) {
//         res.status(422).json(error);
//     }
// });


//delete

router.route("/deleteOT/:id").delete(async(request,response) => {

    let userId = request.params.id;

    await OtSalaries.findByIdAndDelete(userId).then(() => {
        response.status(200).send({status: "User salary deleted"});
    }).catch((error) => {
        console.log(error.message);
        response.status(500).send({status: "Error  with delete user",error: error.message});
    })
})

//get salry
router.route("/getOT/:id").get(async(request,response) =>{

    let userId = request.params.id;
    await OtSalaries.findById(userId)
    .then((otSalaries) => {
        response.status(200).send({status: "User salary fetched",otSalaries})
    }).catch((error)=>{
         console.log(error.message);
        response.status(500).send({status: "Error with get user", error: error.message});
    })
} )



module.exports = router;