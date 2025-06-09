// create a express server
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/connectionDB');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
connectDB();
app.use(express.static('static'));

app.use("/", require('./routes/user'));
app.use("/recipes", require('./routes/recipe'));
// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

