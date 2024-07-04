const services = require("../models/serviceModel");

exports.addService = async (req, res) => {
    const { s_name, s_desc, s_duration, s_price } = req.body;

    if (!s_name || !s_desc || !s_duration || !s_price) {
        return res.status(400).json("Please fill in all the data"); 
    }

    try {
        const preservice = await services.findOne({ s_name: s_name })
        console.log(preservice);

        if (preservice) {
            return res.status(404).json("This service already exists"); 
        } else {
            const addService = new services({
                s_name,s_desc,s_duration,s_price
            });

            await addService.save();
            res.status(201).json(addService);
            console.log(addService);
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

exports.getServiceData = async (req, res) => {
    try {
        const servicedata = await services.find();
        res.status(201).json(servicedata)
        console.log(servicedata);
    } catch (error) {
        res.status(422).json(error);
    }
};

exports.getIndividualService = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;  

        const serviceindividual = await services.findById({_id:id});
        console.log(serviceindividual);
        res.status(201).json(serviceindividual);
    } catch (error) {
        res.status(422).json(error);
    }
};

exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        
        const updatedService = await services.findByIdAndUpdate(id, req.body,{
            new:true
        });
        console.log(updatedService);
        res.status(201).json(updatedService);
    } catch (error) {
        res.status(422).json(error);
    }
};

exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteservice = await services.findByIdAndDelete({_id:id});
        console.log(deleteservice);
        res.status(201).json(deleteservice);
    } catch (error) {
        res.status(422).json(error);
    }
};
