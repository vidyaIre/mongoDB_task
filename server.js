const express = require("express");
const connectDB = require('./dbConfig/index');
const app = express();

require('dotenv').config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const stateRoutes = require('./routes/staeRoute');
app.use('/api/states', stateRoutes);

const districtRoutes = require('./routes/districtRoute');
app.use('/api/disctricts', districtRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server is running on PORT: ${PORT}`);
})