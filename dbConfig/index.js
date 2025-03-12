const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoDBUri = process.env.MONGODB_STRING_URI;
        //console.log(mongoDBUri);
        if (!mongoDBUri) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        const conn = await mongoose.connect(mongoDBUri);
        //console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("error:", error);
        process.exit(1);
    }
};
module.exports = connectDB;