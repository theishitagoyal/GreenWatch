// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware for handling JSON and CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB (adjust the connection string as needed)
mongoose.connect('mongodb://localhost:27017/greenwatch', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

// Import and use the issues route
const issuesRoute = require('./routes/issues');
app.use('/api/issues', issuesRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));