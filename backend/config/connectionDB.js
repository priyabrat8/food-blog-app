const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('MongoDB connected successfully');
    }).catch((err) => {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit the process with failure
    });
};

module.exports = connectDB;