require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies and enable CORS
app.use(express.json());
app.use(cors());

// Serve static files from the public folder
app.use('/', express.static('public'));

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Mongoose schema and model for the budget
const budgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    budget: { type: Number, required: true },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-F]{6}$/i  // Validates color as a hexadecimal string
    }
});

const Budget = mongoose.model('Budget', budgetSchema);

// GET endpoint to fetch all budget items from MongoDB
app.get('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find(); // Fetch all budget items from MongoDB
        res.json({ myBudget: budgets }); // Send the fetched budget items as a response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST endpoint to add new budget items to MongoDB
app.post('/budget', async (req, res) => {
    const { title, budget, color } = req.body; // Extract title, budget, and color from the request body

    const newBudget = new Budget({
        title,
        budget,
        color
    });

    try {
        const savedBudget = await newBudget.save(); // Save the new budget item to MongoDB
        res.status(201).json(savedBudget); // Respond with the saved budget item
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle validation or saving errors
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
