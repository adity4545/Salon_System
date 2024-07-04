const router = require("express").Router();
const { request, response } = require("express");
// let Student = require("../modles/student");
const { default: mongoose } = require("mongoose");
const SpecialLeavingSalaries = require("../models/specialLeavingSalary")


//create new OT Salary

router.route("/addSpecialLeavingSalary/").post((request,response) => {

    
    const name = request.body.name;
    const position = request.body.position;
    const email = request.body.email;
    // const gender = request.body.gender;
    const salary= Number(request.body.salary)
    // const tax = Number(request.body.Tax);
    const noOFleavingdates =Number(request.body.noOFleavingdates)
    const leavingNetnetSalary = Number(request.body.leavingNetnetSalary);

    const newSpecialLeavingSalaries = new SpecialLeavingSalaries({

        _id: new mongoose.Types.ObjectId(),
        name,
        position,
        email,
        // gender,
        salary,
        // tax,
        noOFleavingdates,
        leavingNetnetSalary

    }) 

    //java scripts promise = using then
    newSpecialLeavingSalaries.save().then(()=>{
        response.json("Employee special Leaving salary Added");
    }).catch((error)=>{
        console.log(error);
    })

})

//read
router.route("/allSpecialsalaries").get((request,response) => {

    SpecialLeavingSalaries.find().then((specialLeavingSalaries) => {
        response.json(specialLeavingSalaries)
    }).catch((error)=>{
        console.log(error)
    })
})

router.route("/updateSpecial/:id").put(async(request,response)=>{
    let userId = request.params.id; //params = parameter
    //distructure
    const {name,position,email,salary,noOFleavingdates,leavingNetnetSalary} = request.body;

    //create object
    const updatespecialLeavingSalaries = {
        name,
        position,
        email,
        salary,
        noOFleavingdates,
        leavingNetnetSalary

    }

  await SpecialLeavingSalaries.findByIdAndUpdate(userId,updatespecialLeavingSalaries).then(() => {

    response.status(200).send({status: "user salary updated"})
   }).catch((error) => {
    console.log(error);
    response.status(500).send({status: "Error with updating data",error: err.message});
   })
})

router.route("/deleteSpecial/:id").delete(async(request,response) => {

    let userId = request.params.id;

    await SpecialLeavingSalaries.findByIdAndDelete(userId).then(() => {
        response.status(200).send({status: "User salary deleted"});
    }).catch((error) => {
        console.log(error.message);
        response.status(500).send({status: "Error  with delete user",error: error.message});
    })
})

//get salry
router.route("/getSpecial/:id").get(async(request,response) =>{

    let userId = request.params.id;
    await SpecialLeavingSalaries.findById(userId)
    .then((specialLeavingSalaries) => {
        response.status(200).send({status: "User salary fetched",specialLeavingSalaries})
    }).catch((error)=>{
         console.log(error.message);
        response.status(500).send({status: "Error with get user", error: error.message});
    })
} )


module.exports = router;