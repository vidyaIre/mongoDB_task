const districtModel = require('../models/districtModel');
const stateModel = require('../models/stateModel');
module.exports = {
    addDistrict: async (req, res) => {
        //console.log("hi");
        try {
            const { name, population, state_id } = req.body;
            //console.log(name, population, state_id);
            if (!name || !population || !state_id) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "All fields are required"
                });
            }

            const existState = await stateModel.findById(state_id);
            // console.log("state is:", existState);
            //console.log(existState.name);

            const existDistrict = await districtModel.findOne({ name });
            //console.log("district is:", existDistrict);

            if (existDistrict) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "district already exists:"

                });
            }

            const newDistrict = await districtModel.create({
                name, population, state_id
            });
            console.log("district is:", newDistrict);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: " District added successfully",
                data: newDistrict

            })


        } catch (error) {
            // console.log("error is:", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal server error"
            });
        }
    },
    updateDistrictPopulaton: async (req, res) => {
        try {
            const { name } = req.params;
            const { population } = req.body;
            //console.log(name, population);
            if (!population || typeof population !== 'number' || population <= 0) {
                console.log("hi");
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "Invalid population value. Population must be a positive number",
                   
                });
            }
            const district = await districtModel.findOneAndUpdate(
                { name: name.trim() },
                { $set: { population } },
                { new: true }
            ).lean();
            console.log(district);
            if (district) {
                //console.log(district);
                res.status(200).json({
                    success: true,
                    statusCode: 201,
                    message: " update district successfully",
                    data: district
                })
            } else {
                res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: " fileds are not correct",
                    data: district
                })
            }



        } catch (error) {
            console.log("error is:", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal server error"
            });
        }
    },
    deleteDistrict: async (req, res) => {
        try {
            const { name } = req.params;
            //console.log(name);

            const district = await districtModel.findOneAndDelete({ name});
            console.log(district);
            if(district){
                console.log(district);
               return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message:"District deleted successfully",
                    data: district.message
                })
            }
            else{
               return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message:"District not found"
                })
            }
        }  catch (error) {
            console.log("error is:", error);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal server error"
            });
        }
    }
}