const districtModel = require('../models/districtModel');
const stateModel = require('../models/stateModel');
module.exports = {
    addDistrict: async (req, res) => {
        //console.log("hi");
        try {
            const { name, population, state_id } = req.body;
            //console.log(name, population, state_id);
            if(!name || !population || !state_id){
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "All fields are required"
                });
            }

            const existState = await stateModel.findById(state_id);
           // console.log("state is:", existState);
           //console.log(existState.name);

            const existDistrict = await districtModel.findOne({name});
            //console.log("district is:", existDistrict);

            if(existDistrict){
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message:"district already exists:"
                    
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
    }
}