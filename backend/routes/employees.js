// const router = require("express").Router();
// const { request, response } = require("express");
// // let Student = require("../modles/student");
// const { default: mongoose } = require("mongoose");
// const Employee = require("../modles/employee");

// // create
// router.route("/add").post((request,response) => {

    
//     const name = request.body.name;
//     const age = Number(request.body.age);
//     const gender = request.body.gender;

//     const newEmployee = new Employee({

//         _id: new mongoose.Types.ObjectId(),
//         name,
//         age,
//         gender

//     }) 

//     //java scripts promise = using then
//     newEmployee.save().then(()=>{
//         response.json("Employee Added");
//     }).catch((error)=>{
//         console.log(error);
//     })

// })

// //read
// router.route("/").get((request,response) => {

//     Employee.find().then((employee) => {
//         response.json(employee)
//     }).catch((error)=>{
//         console.log(error)
//     })
// })

// //update
// // we can get also post 
// router.route("/update/:id").put(async(request,response)=>{
//     let userId = request.params.id; //params = parameter
//     //distructure
//     const {name,age,gender} = request.body;

//     //create object
//     const updateEmployee = {
//         name,
//         age,
//         gender

//     }

//     const update = await Employee.findByIdAndUpdate(userId,updateEmployee).then(() => {

//     response.status(200).send({status: "user updated"})
//    }).catch((error) => {
//     console.log(error);
//     response.status(500).send({status: "Error with updating data",error: err.message});
//    })
// })

// //delete

// router.route("/delete/:id").delete(async(request,response) => {

//     let userId = request.params.id;

//     await Employee.findByIdAndDelete(userId).then(() => {
//         response.status(200).send({status: "User deleted"});
//     }).catch((error) => {
//         console.log(err.message);
//         response.status(500).send({status: "Error  with delete user",error: err.message});
//     })
// })

// //get user
// router.route("/get/:id").get(async(request,response) =>{

//     let userId = request.params.id;
//     await Employee.findById(userId)
//     .then((employee) => {
//         response.status(200).send({status: "User fetched",employee})
//     }).catch((error)=>{
//          console.log(error.message);
//         response.status(500).send({status: "Error with get user", error: error.message});
//     })
// } )

// module.exports = router;