const { response } = require('express');
const stateModel = require('../models/stateModel');
module.exports = {
    addState: (req, res) => {
        //console.log("responce:", res);
        try {
            const { name, population, area } = req.body;
            if (name && population && area) {
                const newState = new stateModel({
                    name,
                    population,
                    area
                });

                newState.save()
                    .then((response) => {
                        //console.log("responce is:", response);
                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "User added successfully",
                            data: newState



                        });
                    })
                    .catch((error) => {
                        //console.log("error is:", error);

                        if (error?.code === 11000) {
                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "User with same name already exists!"
                            });
                        } else {
                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "User adding failed"
                            });
                        }

                    })

            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }
        } catch (error) {
            // console.log("error is:", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal server error"
            });
        }
    },
    getStatePopulation: async (req, res) => {
        try {
            const { name } = req.params;
            console.log("name is:", name);

            const state = await stateModel.findOne({ name });
            console.log("state is :", state);

            if (state) {
                res.json({
                    state: name,
                    population: state.population
                })
            }
            else {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "State not found"
                })
            }

        } catch (error) {
            console.log("error is:", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: " Internal server error",
                data: error.message
            })
        }
    },
    totalPopulation: async (req, res) => {
        try {

            const total = await stateModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$population" }
                    }
                }
            ]);
            console.log(total);
            const sumValue = total.length > 0 ? total[0].total : 0;

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Total population calculated successfully",
                data: sumValue
            })
        } catch (error) {
            console.log("error is:", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: " Internal server error",
                data: error.message
            });
        }


    },
    avgPopulationDensity: async (req, res) => {
        try {
            const avgData = await stateModel.aggregate([
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        population: 1,
                        area: 1,
                        density: { $divide: [ "$population", "$area" ] }
                    }
                },
                {
                    $sort: { density: -1 }
                }
            ]);
            console.log(avgData);
            res.status(200).json({
                success: true,
                statusCode: 200,
                count: avgData.length,
                message: "Retrieve avg population density of each states",
                data: avgData
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: " Internal server error",
                data: error.message
            });
        }
    },
    getAllStates: async (req, res) => {
        try{
            const states = await stateModel.find();
            if(states){
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    count: states.length,
                    message: "Retrieve all staes........",
                    data: states
                }); 
            }else {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "no data in database"
                }); 
            }

        } catch (error) {
            console.log("error is:", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal server error"
            }); 
        }
    }

}