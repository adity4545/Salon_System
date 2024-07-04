const router = require("express").Router();
const { request, response } = require("express");
// let Student = require("../modles/student");
const { default: mongoose } = require("mongoose");
const Employeesalarydetailes = require("../models/employeesalarydetaile");

// create
router.route("/addSalary").post((request,response) => {

    
    const name = request.body.name;
    const position = request.body.position;
    const email = request.body.email;
    const gender = request.body.gender;
    const salary= Number(request.body.salary)
    const tax = Number(request.body.tax);
    const netSalary = Number(request.body.netSalary);

    const newEmployeesalarydetailes = new Employeesalarydetailes({

        _id: new mongoose.Types.ObjectId(),
        name,
        position,
        email,
        gender,
        salary,
        tax,
        netSalary,
        // profileImage: {

        //     data: request.file.buffer,
        //     contentType: request.file.mimetype
        // }

    }) 

    //java scripts promise = using then
    newEmployeesalarydetailes.save().then(()=>{
        response.json("Employee salary Added");
    }).catch((error)=>{
        console.log(error);
    })

})


// router.post("/addSalary", async (req, res) => {
//     const { name, s_desc, s_duration, s_price } = req.body;

//     if (!name || !s_desc || !s_duration || !s_price) {
//         return res.status(400).json("Please fill in all the data"); 
//     }

//     try {
//         const preservice = await services.findOne({ name: name })
//         console.log(preservice);

//         if (preservice) {
//             return res.status(404).json("This service already exists"); 
//         } else {
//             const addService = new services({
//                 s_name,s_desc,s_duration,s_price
//             });

//             await addService.save();
//             res.status(201).json(addService);
//             console.log(addService);
//         }
//     } catch (error) {
//         res.status(404).json(error);
//     }
// });

//read
router.route("/allSalary").get((request,response) => {

    Employeesalarydetailes.find().then((employeesalarydetailes) => {
        response.json(employeesalarydetailes)
    }).catch((error)=>{
        console.log(error)
    })
})

//update
// we can get also post 
router.route("/updateSalary/:id").put(async(request,response)=>{
    let userId = request.params.id; //params = parameter
    //distructure
    const {name,position,email,salary,tax,netSalary} = request.body;

    //create object
    const updateEmployeesalarydetailes = {
        name,
        position,
        email,
        salary,
        tax,
        netSalary

    }

  await Employeesalarydetailes.findByIdAndUpdate(userId,updateEmployeesalarydetailes).then(() => {

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

router.route("/deleteSalary/:id").delete(async(request,response) => {

    let userId = request.params.id;

    await Employeesalarydetailes.findByIdAndDelete(userId).then(() => {
        response.status(200).send({status: "User salary deleted"});
    }).catch((error) => {
        console.log(error.message);
        response.status(500).send({status: "Error  with delete user",error: error.message});
    })
})

//get salry
router.route("/get/:id").get(async(request,response) =>{

    let userId = request.params.id;
    await Employeesalarydetailes.findById(userId)
    .then((employeesalarydetailes) => {
        response.status(200).send({status: "User salary fetched",employeesalarydetailes})
    }).catch((error)=>{
         console.log(error.message);
        response.status(500).send({status: "Error with get user", error: error.message});
    })
} )


   

module.exports = router;