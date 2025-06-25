// create a express server
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/connectionDB');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 8080;
app.use(express.json());

// Serve Vite build
app.use(express.static(path.join(__dirname, 'food-blog-app', 'dist')));

connectDB();
app.use(express.static('static'));

app.use("/", require('./routes/user'));
app.use("/recipes", require('./routes/recipe'));

// Fallback to index.html (for React Router)
app.get((req, res) => {
  res.sendFile(path.join(__dirname, 'food-blog-app', 'dist', 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

