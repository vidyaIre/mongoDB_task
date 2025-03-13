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
            const { name} = req.params;
            console.log("name is:",name);

            const state = await stateModel.findOne({ name});
            console.log("state is :", state);

            if(state){
                res.json({
                    state: name,
                    population: state.population
                })
            }
            else{
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
    }
}