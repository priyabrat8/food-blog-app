// create a express server
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/connectDB');

const PORT = process.env.PORT || 3000;
connectDB();
app.use("/recipes", require('./routes/recipe'));

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

